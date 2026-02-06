import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn
} from 'typeorm';
import { User } from '../users/users.entity';
import { Expose } from 'class-transformer';

@Entity()
export class PatientProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  age: number;

  @Column()
  gender: string;

}
