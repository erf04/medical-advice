// src/doctors/doctors.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { User, UserRole } from '../users/users.entity';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';


@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorProfile)
    private doctorRepo: Repository<DoctorProfile>,
  ) {}

  async createProfile(user: User, dto: CreateDoctorProfileDto) {
    if (user.role !== UserRole.DOCTOR) {
      throw new ForbiddenException('Only doctors can create a profile');
    }

    const exists = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (exists) {
      throw new BadRequestException('Doctor profile already exists');
    }

    const profile = this.doctorRepo.create({
      ...dto,
      user,
      maxConcurrentConsultations: dto.maxConcurrentConsultations ?? 1,
    });

    return this.doctorRepo.save(profile);
  }

  async getMyProfile(user: User) {
    const profile =  this.doctorRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['categories','user'],
    });
    return instanceToPlain(profile);
  }
}
