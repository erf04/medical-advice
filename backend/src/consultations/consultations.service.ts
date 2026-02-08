import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual, Not, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { Consultation } from './consultation.entity';
import { DoctorProfile } from '../doctors/doctor-profile.entity';
import { PatientProfile } from '../patients/patient-profile.entity';
import { DoctorSchedule } from '../doctors/schedule/doctor-schedule.entity';
import { User } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';
import { ReserveConsultationDto } from './dto/create-consultation.dto';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class ConsultationService {
  constructor(
    private readonly patientService:PatientsService,
    private readonly doctorService:DoctorsService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly walletService: WalletService,
  ) {}

  // async create(
  //   user: User,
  //   dto: CreateConsultationDto,
  // ): Promise<Consultation> {

  //   // 1️⃣ Doctor
  //   const doctor = await this.doctorRepo.findOne({
  //     where: { id: dto.doctorId },
  //   });

  //   if (!doctor) {
  //     throw new NotFoundException('Doctor not found');
  //   }

  //   // 2️⃣ Patient ownership
  //   const patient = await this.patientRepo.findOne({
  //     where: {
  //       id: dto.patientProfileId,
  //       user: { id: user.id },
  //     },
  //   });

  //   if (!patient) {
  //     throw new BadRequestException(
  //       'Patient profile does not belong to user',
  //     );
  //   }

  //   // 3️⃣ Doctor working hours
  //   const now = dayjs();
  //   const dayOfWeek = now.day(); // map if you use Persian week
  //   const time = now.format('HH:mm');

  //   const schedule = await this.scheduleRepo.findOne({
  //     where: {
  //       doctor: { id: doctor.id },
  //       dayOfWeek,
  //       startTime: LessThanOrEqual(time),
  //       endTime: MoreThanOrEqual(time),
  //     },
  //   });

  //   if (!schedule) {
  //     throw new BadRequestException(
  //       'Doctor is not available at this time',
  //     );
  //   }

  //   // 4️⃣ Doctor capacity (active + pending)
  //   const activeCount = await this.consultationRepo.count({
  //     where: {
  //       doctor: { id: doctor.id },
  //       status: 'ACTIVE',
  //     },
  //   });

  //   if (activeCount >= doctor.maxConcurrentConsultations) {
  //     throw new BadRequestException(
  //       'Doctor capacity is full',
  //     );
  //   }

  //   // 5️⃣ Pricing & commission (snapshot)
  //   const price = Number(doctor.consultationPrice) || this.configService.get<number>('DEFAULT_CONSULTATION_PRICE');
  //   const commissionPercent = this.configService.get<number>('DEFAULT_COMMISSION_PERCENT');

  //   // 6️⃣ Create consultation
  //   const endDateTime = dayjs(consultationDate)
  //     .hour(Number(dto.endTime.split(':')[0]))
  //     .minute(Number(dto.endTime.split(':')[1]))
  //     .second(0);

  //   const consultation = this.consultationRepo.create({
  //     doctor,
  //     patient,

  //     /* Reservation info */
  //     reservedDate: consultationDate,   // Date (UTC, 00:00)
  //     startTime: dto.startTime,          // "HH:mm"
  //     endTime: dto.endTime,              // "HH:mm"

  //     /* Lifecycle */
  //     status: 'PENDING_PAYMENT',

  //     /* Financial snapshot */
  //     price,                             // from admin config
  //     commissionPercent,                 // from admin config

  //     /* Runtime */
  //     expiresAt: endDateTime.add(72, 'hour').toDate(),
  //   });
  // }

  async reserve(dto: ReserveConsultationDto, user: User) {
    return this.dataSource.transaction(async manager => {
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
          status: Not('CANCELED'),
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
          status: Not('CANCELED'),
        },
      });

      if (existingCount >= doctor.maxConcurrentConsultations) {
        throw new BadRequestException('This slot is fully booked');
      }



      /* 6. Price snapshot (admin-defined) */
      const price = Number(doctor.consultationPrice) || this.configService.get<number>('DEFAULT_CONSULTATION_PRICE') || 100; // fallback to 100 if not set
      const commissionPercent = this.configService.get<number>('DEFAULT_COMMISSION_PERCENT');

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

        status: 'PENDING_PAYMENT',

        price,
        commissionPercent,
        subject: dto.subject,
        description: dto.description,

        expiresAt: endDateTime.add(72, 'hour').toDate(),
      });

      await manager.save(consultation);

      /* 9. Symbolic payment */
      const { success , message } = await this.processPayment(
        dto.paymentMethod,
        user,
        price,
        consultation,
      );

      if (!success) {
        throw new BadRequestException(`Payment failed: ${message}`);
      }

      /* 10. Mark as PAID */
      consultation.status = 'PAID';
      await manager.save(consultation);

      return consultation;
    });
  }

  private async processPayment(
    method: 'WALLET' | 'DIRECT',
    user: User,
    amount: number,
    consultation: Consultation,
  ): Promise<{ success: boolean , message?: string}> {
    // Placeholder — always succeeds for now
    if (method === 'WALLET') {
      await this.walletService.payConsultationWithWallet(
        user,
        consultation,
      );
      return { success: true };
    } else if (method === 'DIRECT') {
      // DIRECT PAY (gateway simulation)
      await this.walletService.depositByGateway(
        user,
        amount,
        consultation.id,
      );

      await this.walletService.payConsultationWithWallet(
        user,
        consultation,
      );
      return { success: true };
    }
    else {
      return { success: false, message: 'Unsupported payment method' };
    }
  }
}
