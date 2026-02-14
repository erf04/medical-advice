import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DoctorProfile } from "../doctor-profile.entity";
import { Consultation } from "../../consultations/consultation.entity";
import { User } from "../../users/users.entity";


@Entity()
export class AdminMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DoctorProfile)
  doctor: DoctorProfile;

  @ManyToOne(() => User, { nullable: false })
  admin: User;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  readAt?: Date;
}
