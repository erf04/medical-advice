import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const exists = await this.categoryRepo.findOne({
      where: { title: dto.title },
    });

    if (exists) {
      throw new BadRequestException('Category already exists');
    }

    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async findAll() {
    return this.categoryRepo.find({
      relations: ['doctors','doctors.user'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['doctors','docrtors.user'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    Object.assign(category, dto);

    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    await this.categoryRepo.remove(category);

    return { message: 'Category deleted successfully' };
  }
}
