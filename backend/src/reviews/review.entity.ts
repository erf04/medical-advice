import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consultation } from "../consultations/consultation.entity";
import { DoctorProfile } from "../doctors/doctor-profile.entity";
import { User } from "../users/users.entity";
import { PatientProfile } from "../patients/patient-profile.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Consultation)
  consultation: Consultation;

  @ManyToOne(() => DoctorProfile)
  doctor: DoctorProfile;

  @ManyToOne(() => PatientProfile)
  patient: PatientProfile;

  @Column()
  rating: number; // 1-5

  @Column({ nullable: true })
  comment?: string;

  @CreateDateColumn()
  createdAt: Date;
}
