// src/admin/admin-users.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from '../users.entity';
import { AdminCreateUserDto } from './dto/create-user.dto';
import { AdminUpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  /* ---------- CREATE ---------- */

  async create(dto: AdminCreateUserDto) {
    const existing = await this.userRepo.findOne({
      where: { phone: dto.phone },
    });

    if (existing) {
      throw new BadRequestException('Phone already exists');
    }

    const user = this.userRepo.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    return this.userRepo.save(user);
  }

  /* ---------- FIND ALL (paginated + search) ---------- */

  async findAll(
    search?: string,
  ) {
    const where = search
      ? [
          { phone: ILike(`%${search}%`) },
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
        ]
      : {};

    const users = await this.userRepo.find({
      where,
      relations: ['doctorProfile', 'patientProfile'],
      order: { createdAt: 'DESC' },
    });

    return users;
  }

  /* ---------- FIND ONE ---------- */

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['doctorProfile', 'patientProfile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /* ---------- UPDATE ---------- */

  async update(id: number, dto: AdminUpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);

    return this.userRepo.save(user);
  }

  /* ---------- DELETE ---------- */

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);

    return { message: 'User deleted successfully' };
  }
}
