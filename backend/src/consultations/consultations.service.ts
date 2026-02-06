import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import dayjs from 'dayjs';

import { Consultation, ConsultationStatus } from './consultation.entity';
import { DoctorProfile } from '../doctors/doctor-profile.entity';
import { PatientProfile } from '../patients/patient-profile.entity';
import { DoctorSchedule } from '../doctors/doctor-schedule.entity';
import { User } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepo: Repository<Consultation>,

    @InjectRepository(DoctorProfile)
    private readonly doctorRepo: Repository<DoctorProfile>,

    @InjectRepository(PatientProfile)
    private readonly patientRepo: Repository<PatientProfile>,

    @InjectRepository(DoctorSchedule)
    private readonly scheduleRepo: Repository<DoctorSchedule>,

    private readonly configService:ConfigService
  ) {}

  async create(
    user: User,
    dto: CreateConsultationDto,
  ): Promise<Consultation> {

    // 1️⃣ Doctor
    const doctor = await this.doctorRepo.findOne({
      where: { id: dto.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // 2️⃣ Patient ownership
    const patient = await this.patientRepo.findOne({
      where: {
        id: dto.patientProfileId,
        user: { id: user.id },
      },
    });

    if (!patient) {
      throw new BadRequestException(
        'Patient profile does not belong to user',
      );
    }

    // 3️⃣ Doctor working hours
    const now = dayjs();
    const dayOfWeek = now.day(); // map if you use Persian week
    const time = now.format('HH:mm');

    const schedule = await this.scheduleRepo.findOne({
      where: {
        doctor: { id: doctor.id },
        dayOfWeek,
        startTime: LessThanOrEqual(time),
        endTime: MoreThanOrEqual(time),
      },
    });

    if (!schedule) {
      throw new BadRequestException(
        'Doctor is not available at this time',
      );
    }

    // 4️⃣ Doctor capacity (active + pending)
    const activeCount = await this.consultationRepo.count({
      where: {
        doctor: { id: doctor.id },
        status: ConsultationStatus.ACTIVE,
      },
    });

    if (activeCount >= doctor.maxConcurrentConsultations) {
      throw new BadRequestException(
        'Doctor capacity is full',
      );
    }

    // 5️⃣ Pricing & commission (snapshot)
    const price = Number(doctor.consultationPrice) || this.configService.get<number>('DEFAULT_CONSULTATION_PRICE');
    const commissionPercent = this.configService.get<number>('DEFAULT_COMMISSION_PERCENT');

    // 6️⃣ Create consultation
    const consultation = this.consultationRepo.create({
      doctor,
      patient,
      subject: dto.subject,
      description: dto.description,
      price,
      commissionPercent,
      status: ConsultationStatus.PENDING,
      expiresAt: now.add(72, 'hour').toDate(),
    });

    return this.consultationRepo.save(consultation);
  }
}
