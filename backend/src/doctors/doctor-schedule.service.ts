// src/doctors/doctor-schedule.service.ts
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorProfile } from './doctor-profile.entity';
import { SetDoctorScheduleDto } from './dto/set-doctor-schedule.dto';
import { User } from '../users/users.entity';
import { DoctorsService } from './doctors.service';

@Injectable()
export class DoctorScheduleService {
  constructor(
    @InjectRepository(DoctorSchedule)
    private scheduleRepo: Repository<DoctorSchedule>,
    private doctorService:DoctorsService
  ) {}

  async setSchedule(
    user: User,
    dto: SetDoctorScheduleDto,
  ) {
    if (dto.startTime >= dto.endTime) {
      throw new BadRequestException(
        'Start time must be before end time',
      );
    }
    const doctor = await this.doctorService.getMyProfile(user);
    const existing = await this.scheduleRepo.findOne({
      where: {
        doctor: { id: doctor.id },
        dayOfWeek: dto.dayOfWeek,
      },
    });

    if (existing) {
      existing.startTime = dto.startTime;
      existing.endTime = dto.endTime;
      return this.scheduleRepo.save(existing);
    }

    const schedule = this.scheduleRepo.create({
      doctor,
      ...dto,
    });

    return this.scheduleRepo.save(schedule);
  }

  async getMySchedules(user: User) {
    const doctor = await this.doctorService.getMyProfile(user);
    return this.scheduleRepo.find({
      where: { doctor: { id: doctor.id } },
      order: { dayOfWeek: 'ASC' },
    });
  }

  async deleteSchedule(
    user: User,
    dayOfWeek: number,
  ) {
    const doctor = await this.doctorService.getMyProfile(user);
    const schedule = await this.scheduleRepo.findOne({
      where: {
        doctor: { id: doctor.id },
        dayOfWeek,
      },
    });

    if (!schedule) {
      throw new BadRequestException('Schedule not found');
    }

    await this.scheduleRepo.remove(schedule);
    return { message: 'Schedule removed' };
  }
}
