import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consultation } from "../consultations/consultation.entity";
import { DoctorProfile } from "../doctors/doctor-profile.entity";
import { User } from "../users/users.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Consultation)
  consultation: Consultation;

  @ManyToOne(() => DoctorProfile)
  doctor: DoctorProfile;

  @ManyToOne(() => User)
  patient: User;

  @Column()
  rating: number; // 1-5

  @Column({ nullable: true })
  comment?: string;

  @CreateDateColumn()
  createdAt: Date;
}
