import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  DataSource,
} from 'typeorm';
import dayjs from 'dayjs';

import { Consultation, ConsultationStatus } from './consultation.entity';
import { DoctorProfile } from '../doctors/doctor-profile.entity';
import { PatientProfile } from '../patients/patient-profile.entity';
import { DoctorSchedule } from '../doctors/schedule/doctor-schedule.entity';
import { User } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';
import { ReserveConsultationDto } from './dto/create-consultation.dto';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';
import { WalletService } from '../wallet/wallet.service';
import { log } from 'console';

@Injectable()
export class ConsultationService {
  constructor(
    private readonly patientService: PatientsService,
    private readonly doctorService: DoctorsService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly walletService: WalletService,
    @InjectRepository(Consultation)
    private consultationRepo: Repository<Consultation>,
  ) {}

  async findById(id: number) {
    return this.consultationRepo.findOne({
      where: { id },
      relations: ['doctor', 'patient', 'doctor.user', 'patient.user'],
    });
  }

  async reserve(dto: ReserveConsultationDto, user: User) {
    return this.dataSource.transaction(async (manager) => {
      /* 1. Load doctor */
      const doctor = await this.doctorService.findProfileById(dto.doctorId);
      if (!doctor) {
        throw new BadRequestException('Doctor not found');
      }

      /* 2. Load schedule */
      const schedule = await manager.findOne(DoctorSchedule, {
        where: {
          id: dto.scheduleId,
          doctor: { id: doctor.id },
        },
      });

      if (!schedule) {
        throw new BadRequestException('Schedule not found');
      }

      /* 3. Convert Jalali → Gregorian */
      const reservedDate = dayjs(dto.reservedDateJalali, 'YYYY/MM/DD')
        .calendar('jalali')
        .startOf('day')
        .toDate();

      /* 4. Load patient (can be different from user) */
      const patient = await this.patientService.findById(dto.patientId);
      if (!patient) {
        throw new BadRequestException('Patient not found');
      }

      const alreadyReserved = await manager.exists(Consultation, {
        where: {
          doctor: { id: doctor.id },
          patient: { id: patient.id },
          reservedDate,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          status: Not(ConsultationStatus.CANCELED),
        },
      });

      if (alreadyReserved) {
        throw new BadRequestException(
          'You have already reserved this time slot with this doctor',
        );
      }

      /* 5. Capacity check (CRITICAL) */
      const existingCount = await manager.count(Consultation, {
        where: {
          doctor: { id: doctor.id },
          reservedDate,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          status: Not(ConsultationStatus.CANCELED),
        },
      });

      if (existingCount >= doctor.maxConcurrentConsultations) {
        throw new BadRequestException('This slot is fully booked');
      }

      /* 6. Price snapshot (admin-defined) */
      const price =
        Number(doctor.consultationPrice) ||
        this.configService.get<number>('DEFAULT_CONSULTATION_PRICE') ||
        100; // fallback to 100 if not set
      const commissionPercent = this.configService.get<number>(
        'DEFAULT_COMMISSION_PERCENT',
      );

      /* 7. Calculate expiresAt (endTime + grace) */
      const endDateTime = dayjs(reservedDate)
        .hour(Number(schedule.endTime.split(':')[0]))
        .minute(Number(schedule.endTime.split(':')[1]))
        .second(0);

      /* 8. Create consultation */
      const consultation = manager.create(Consultation, {
        doctor,
        patient,

        reservedDate,
        startTime: schedule.startTime,
        endTime: schedule.endTime,

        status: ConsultationStatus.PENDING_PAYMENT,

        price,
        commissionPercent,
        subject: dto.subject,
        description: dto.description,

        expiresAt: endDateTime.add(72, 'hour').toDate(),
      });

      await manager.save(consultation);

      /* 9. Symbolic payment */
      const { success, message } = await this.processPayment(
        dto.paymentMethod,
        user,
        price,
        consultation,
      );

      if (!success) {
        throw new BadRequestException(`Payment failed: ${message}`);
      }

      /* 10. Mark as PAID */
      consultation.status = ConsultationStatus.PAID;
      await manager.save(consultation);

      return consultation;
    });
  }

  private async processPayment(
    method: 'WALLET' | 'DIRECT',
    user: User,
    amount: number,
    consultation: Consultation,
  ): Promise<{ success: boolean; message?: string }> {
    // Placeholder — always succeeds for now
    if (method === 'WALLET') {
      await this.walletService.payConsultationWithWallet(user, consultation);
      return { success: true };
    } else if (method === 'DIRECT') {
      // DIRECT PAY (gateway simulation)
      await this.walletService.depositByGateway(user, amount, consultation.id);

      await this.walletService.payConsultationWithWallet(user, consultation);
      return { success: true };
    } else {
      return { success: false, message: 'Unsupported payment method' };
    }
  }

  async startConsultation(id: number, userId: number) {
    const consultation = await this.consultationRepo.findOne({
      where: { id },
      relations: ['doctor', 'doctor.user'],
    });

    if (!consultation) throw new NotFoundException();

    if (consultation.doctor.user.id !== userId) throw new ForbiddenException();

    if (consultation.status !== ConsultationStatus.PAID)
      throw new BadRequestException('Invalid state');

    const [startHour, startMinute] = consultation.startTime
      .split(':')
      .map(Number);
    const [endHour, endMinute] = consultation.endTime.split(':').map(Number);

    const baseDate = dayjs(consultation.reservedDate, {
      jalali: true,
    });

    const startDateTime = baseDate
      .hour(startHour)
      .minute(startMinute)
      .second(0);

    const endDateTime = baseDate.hour(endHour).minute(endMinute).second(0);

    const now = dayjs().calendar('jalali'); // current real time
    // log('now', now.valueOf());
    // log('startDateTime', startDateTime.valueOf());
    // log('endDateTime', endDateTime.valueOf());

    if (now.isBefore(startDateTime)) {
      throw new BadRequestException('Too early');
    }

    if (now.isAfter(endDateTime)) {
      throw new BadRequestException('Slot expired');
    }

    consultation.status = ConsultationStatus.ACTIVE;
    consultation.startedAt = now.toDate();

    return this.consultationRepo.save(consultation);
  }
}
