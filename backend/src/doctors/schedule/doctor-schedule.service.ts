// src/doctors/doctor-schedule.service.ts
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorProfile } from '../doctor-profile.entity';
import { SetDoctorScheduleDto } from '../dto/set-doctor-schedule.dto';
import { User } from '../../users/users.entity';
import { DoctorsService } from '../doctors.service';
import { Consultation, ConsultationStatus } from '../../consultations/consultation.entity';
import dayjs from '../../common/dayjs';
import { log } from 'console';



function generateSlots(
  start: string,
  end: string,
  duration: number,
) {
  const slots: { start: string; end: string }[] = [];
  let current = dayjs(start, 'HH:mm');
  const endTime = dayjs(end, 'HH:mm');

  while (current.add(duration, 'minute').isSameOrBefore(endTime)) {
    const slotStart = current.format('HH:mm');
    const slotEnd = current.add(duration, 'minute').format('HH:mm');

    slots.push({ start: slotStart, end: slotEnd });
    current = current.add(duration, 'minute');
  }

  return slots;
}


@Injectable()
export class DoctorScheduleService {
  constructor(
    @InjectRepository(DoctorSchedule)
    private scheduleRepo: Repository<DoctorSchedule>,
    @InjectRepository(Consultation)
    private consultationRepo: Repository<Consultation>,
    private doctorService:DoctorsService
  ) {


  }

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
    // const existing = await this.scheduleRepo.findOne({
    //   where: {
    //     doctor: { id: doctor.id },
    //     dayOfWeek: dto.dayOfWeek,
    //   },
    // });

    // if (existing) {
    //   existing.startTime = dto.startTime;
    //   existing.endTime = dto.endTime;
    //   return this.scheduleRepo.save(existing);
    // }

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


  async getAvailableDays(
    doctorId: number,
    fromJalali: string,
    toJalali: string,
  ) {
    const from = dayjs(fromJalali, 'YYYY/MM/DD')
      .calendar('jalali')
      .toDate();

    const to = dayjs(toJalali, 'YYYY/MM/DD')
      .calendar('jalali')
      .toDate();

    const result: any[] = [];
    let date = dayjs(from);

    while (date.isSameOrBefore(to)) {
      const slots = await this.getAvailableSlots(
        doctorId,
        date.format('YYYY-MM-DD'),
      );
      result.push({
        date: date.format('YYYY/MM/DD'),
        availableSlots: slots.length,
      });

      date = date.add(1, 'day');
    }
    return result;
  }

  async getAvailableSlots(
    doctorId: number,
    jalaliDate: string, // YYYY-MM-DD
  ) {
    // log('jalaliDate',jalaliDate)
    const doctor = await this.doctorService.findProfileById(doctorId);
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }
    const reservedDate = dayjs(jalaliDate, 'YYYY-MM-DD')
    .calendar('jalali')
    .startOf('day')
    .toDate();
    const dayOfWeek = dayjs(reservedDate).day();

    const schedules = await this.scheduleRepo.find({
      where: {
        doctor: { id: doctorId },
        dayOfWeek,
      },
      order: { startTime: 'ASC' },
    });

    // log('schedules', schedules);

    if (!schedules.length) return [];

    const reservations = await this.consultationRepo.find({
      where: {
        doctor: { id: doctorId },
        reservedDate: reservedDate,
        status: Not(ConsultationStatus.CANCELED),
      },
    });

    return schedules
      .map(schedule => {
        const count = reservations.filter(
          r =>
            r.startTime === schedule.startTime &&
            r.endTime === schedule.endTime,
        ).length;

        const remaining =
          doctor.maxConcurrentConsultations - count;

        return {
          scheduleId: schedule.id,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          remainingCapacity: Math.max(remaining, 0),
        };
      })
      .filter(s => s.remainingCapacity > 0);
  }


}
