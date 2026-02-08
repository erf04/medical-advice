
import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany,
  OneToMany
} from 'typeorm';
import { User } from '../users/users.entity';
import { Category } from '../categories/category.entity';
import { DoctorSchedule } from './schedule/doctor-schedule.entity';

@Entity()
export class DoctorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ unique: true })
  medicalCode: string;

  @Column()
  contactInfo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 1 })
  maxConcurrentConsultations: number;
  @Column({ nullable: true })
  consultationPrice: number;

  @ManyToMany(() => Category, (c) => c.doctors)
  categories: Category[];

  @Column({nullable: true})
  commissionPercent: number;

  @OneToMany(
    () => DoctorSchedule,
    schedule => schedule.doctor, // 👈 reverse name
    { cascade: true },
  )
  schedules: DoctorSchedule[];
}
