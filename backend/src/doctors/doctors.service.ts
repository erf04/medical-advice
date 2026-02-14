// src/doctors/doctors.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { User, UserRole } from '../users/users.entity';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Category } from '../categories/category.entity';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { log } from 'console';
import { Review } from '../reviews/review.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorProfile)
    private doctorRepo: Repository<DoctorProfile>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
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
    const category = await this.categoryRepo.findOne({
      where: {
        id: dto.category,
      },
    });
    if (!category) {
      throw new BadRequestException('category not found!');
    }

    const profile = this.doctorRepo.create({
      medicalCode: dto.medicalCode,
      contactInfo: dto.contactInfo,
      category: category,
      user,
      maxConcurrentConsultations: dto.maxConcurrentConsultations ?? 1,
      consultationPrice: dto.consultationPrice ?? 0,
      commissionPercent: dto.commissionPercent ?? 0,
    });

    return this.doctorRepo.save(profile);
  }

  async editProfile(user: User, dto: UpdateDoctorProfileDto) {
    if (user.role !== UserRole.DOCTOR) {
      throw new ForbiddenException('Only doctors can edit their profile');
    }

    const profile = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['category'],
    });

    if (!profile) {
      throw new BadRequestException('Doctor profile not found');
    }

    if (dto.category) {
      const category = await this.categoryRepo.findOne({
        where: { id: dto.category },
      });

      if (!category) {
        throw new BadRequestException('Category not found!');
      }

      profile.category = category;
    }

    if (dto.medicalCode !== undefined) {
      profile.medicalCode = dto.medicalCode;
    }

    if (dto.contactInfo !== undefined) {
      profile.contactInfo = dto.contactInfo;
    }

    if (dto.maxConcurrentConsultations !== undefined) {
      profile.maxConcurrentConsultations = dto.maxConcurrentConsultations;
    }

    return this.doctorRepo.save(profile);
  }

  async getMyProfile(user: User) {
    log('Getting doctor profile for user:', user.id);
    const profile = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },
      relations: [
        'category',
        'user',
        'schedules', // 👈 load schedules
      ],
      order: {
        schedules: {
          startTime: 'ASC',
        },
      },
    });
    if (!profile) {
      throw new BadRequestException('Doctor profile not found');
    }
    return profile;
  }

  async findProfileById(id: number) {
    const profile = await this.doctorRepo.findOne({
      where: { id },
      relations: [
        'category',
        'user',
        'schedules', // 👈 load schedules
      ],
      order: {
        schedules: {
          startTime: 'ASC',
        },
      },
    });

    if (!profile)
      throw new NotFoundException('Doctor profile not found');

    /* ------------------------------- */
    /* Group schedules by dayOfWeek    */
    /* ------------------------------- */
    const schedulesByDay = profile.schedules.reduce(
      (acc, schedule) => {
        const day = schedule.dayOfWeek;

        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push({
          id: schedule.id,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          duration: schedule.slotDuration,
        });

        return acc;
      },
      {} as Record<string | number, any[]>,
    );

    /* ------------------------------- */
    /* Return clean API shape          */
    /* ------------------------------- */
    return instanceToPlain({
      ...profile,
      schedules: schedulesByDay,
    });
  }

  async getAllDoctors() {
    const doctors = await this.doctorRepo.find({
      where: { isActive: true },
      relations: ['category', 'user'],
    });
    return doctors.map((d) => instanceToPlain(d));
  }

  async getDoctorReviews(doctorUserId: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorUserId },
    });
    if (!doctor) throw new NotFoundException('Doctor profile not found');

    const reviews = await this.reviewRepo.find({
      where: {
        doctor: { id: doctor.id },
      },
      relations: ['patient', 'consultation'],
      order: {
        createdAt: 'DESC',
      },
    });
    return reviews;
  }
}
