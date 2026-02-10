import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SignUpDto } from "../auth/auth.dto";
import { DoctorProfile } from "../doctors/doctor-profile.entity";
import { PatientProfile } from "../patients/patient-profile.entity";

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToOne(() => DoctorProfile, (d) => d.user)
  doctorProfile: DoctorProfile;

  @OneToOne(() => PatientProfile, (p) => p.user)
  patientProfile: PatientProfile;

  @Column({ nullable: true })
  profileImage?: string; // e.g. /uploads/users/user-12.png

  @CreateDateColumn()
  createdAt: Date;

  static fromSignUpDto(dto: SignUpDto): User {
    const user = new User();
    user.firstName = dto.first_name;
    user.lastName = dto.last_name;
    user.phone = dto.phone;
    user.email = dto.email;
    user.role = dto.role as UserRole;
    user.password = dto.password;
    return user;
  }
}
