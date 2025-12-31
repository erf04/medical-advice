import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SignUpDto } from "../auth/auth.dto";

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
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

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
