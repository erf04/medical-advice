import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consultation } from "../consultation.entity";
import { DoctorProfile } from "../../doctors/doctor-profile.entity";

@Entity()
export class SettleRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Consultation)
  @JoinColumn()
  consultation: Consultation;

  @ManyToOne(() => DoctorProfile)
  doctor: DoctorProfile;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  adminResponse: 'PENDING' | 'APPROVED' | 'REJECTED';

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  respondedAt?: Date;
}
