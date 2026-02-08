import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DoctorProfile } from "../doctors/doctor-profile.entity";
import { PatientProfile } from "../patients/patient-profile.entity";

// src/consultations/consultation.entity.ts
@Entity()
@Index(['doctor', 'reservedDate', 'startTime', 'endTime'])
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DoctorProfile)
  doctor: DoctorProfile;

  @ManyToOne(() => PatientProfile)
  patient: PatientProfile;

  @Column()
  subject: string;

  @Column()
  description: string = '';

  /* Reservation info */
  @Column({ type: 'date' })
  reservedDate: Date; // Gregorian (UTC)

  @Column() // HH:mm
  startTime: string;

  @Column() // HH:mm
  endTime: string;

  /* Lifecycle */
  @Column({
    type: 'enum',
    enum: ['PENDING_PAYMENT', 'PAID', 'ACTIVE', 'FINISHED', 'CANCELED'],
  })
  status: string;

  /* Financial snapshot */
  @Column()
  price: number;

  @Column()
  commissionPercent: number;

  /* Runtime info */
  @Column({ nullable: true })
  startedAt?: Date;

  @Column({ nullable: true })
  endedAt?: Date;

  @Column()
  expiresAt: Date; // chat grace period end

  @CreateDateColumn()
  createdAt: Date;
}
