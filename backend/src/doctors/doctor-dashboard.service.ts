import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Consultation } from '../consultations/consultation.entity';
import { DoctorProfile } from '../doctors/doctor-profile.entity';

@Injectable()
export class DoctorDashboardService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepo: Repository<Consultation>,

    @InjectRepository(DoctorProfile)
    private readonly doctorRepo: Repository<DoctorProfile>,
  ) {}

  async getPendingConsultations(userId: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!doctor) {
      throw new Error('Doctor profile not found');
    }

    return this.consultationRepo.find({
      where: {
        doctor: { id: doctor.id },
        status: 'PENDING',
      },
      relations: ['patient','patient.user'],
      order: { startedAt: 'ASC' },
    });
  }

  async getActiveConsultations(userId: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!doctor) {
      throw new Error('Doctor profile not found');
    }

    return this.consultationRepo.find({
      where: {
        doctor: { id: doctor.id },
        status: 'ACTIVE',
      },
      relations: ['patient','patient.user'],
      order: { startedAt: 'ASC' },
    });
  }
}
