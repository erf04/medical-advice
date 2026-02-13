
import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany,
  OneToMany,
  ManyToOne
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

  @ManyToOne(() => Category, (c) => c.doctors)
  @JoinColumn()
  category: Category;

  @Column({nullable: true})
  commissionPercent: number;

  @OneToMany(
    () => DoctorSchedule,
    schedule => schedule.doctor, // 👈 reverse name
    { cascade: true },
  )
  schedules: DoctorSchedule[];

  @Column({ default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  totalReviews: number;

  
  @Column({ type: 'int', default: 0 })
  patientCount: number;

  @Column({ type: 'int', default: 0 })
  consultationCount: number;

}
