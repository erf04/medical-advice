// src/categories/category.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable
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

  @ManyToMany(() => DoctorProfile, (d) => d.categories)
  @JoinTable()
  doctors: DoctorProfile[];
}
