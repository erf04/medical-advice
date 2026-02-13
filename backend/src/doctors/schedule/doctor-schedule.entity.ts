// src/doctors/doctor-schedule.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { DoctorProfile } from '../doctor-profile.entity';

@Entity()
export class DoctorSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DoctorProfile, { onDelete: 'CASCADE' })
  doctor: DoctorProfile;

  // 0 = Saturday, 6 = Friday (Iran convention)
  @Column()
  dayOfWeek: number;

  // HH:mm (24h)
  @Column()
  startTime: string;

  @Column()
  endTime: string;

  
  @Column({nullable: true}) // minutes
  slotDuration: number;
}
