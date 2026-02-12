import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation, ConsultationStatus } from '../../consultations/consultation.entity';
import { DoctorProfile } from '../doctor-profile.entity';



@Injectable()
export class DoctorDashboardService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepo: Repository<Consultation>,

    @InjectRepository(DoctorProfile)
    private readonly doctorRepo: Repository<DoctorProfile>,
  ) {}

  async getUpcomingForDoctor(userId: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!doctor) {
      throw new Error('Doctor profile not found');
    }

    return this.consultationRepo.find({
      where: {
        doctor: { id: doctor.id },
        status: ConsultationStatus.PAID,
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
        status: ConsultationStatus.ACTIVE,
      },
      relations: ['patient','patient.user'],
      order: { startedAt: 'ASC' },
    });
  }
}
