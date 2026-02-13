// src/categories/category.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
  OneToMany
} from 'typeorm';
import { DoctorProfile } from '../doctors/doctor-profile.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => DoctorProfile, (d) => d.category)
  doctors: DoctorProfile[];
}
