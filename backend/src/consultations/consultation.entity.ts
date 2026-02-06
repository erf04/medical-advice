// src/consultations/consultation.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from 'typeorm';
import { DoctorProfile } from '../doctors/doctor-profile.entity';
import { PatientProfile } from '../patients/patient-profile.entity';


export enum ConsultationStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
}


@Entity()
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DoctorProfile)
  doctor: DoctorProfile;

  @ManyToOne(() => PatientProfile)
  patient: PatientProfile;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: ConsultationStatus ,default: ConsultationStatus.PENDING})
  status: ConsultationStatus;

  @Column()
  price: number;

  @Column()
  commissionPercent: number;

  @CreateDateColumn()
  startedAt: Date;

  @Column({ nullable: true })
  endedAt?: Date;

  @Column()
  expiresAt: Date;
}
