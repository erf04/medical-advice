import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class PatientProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: string;
}
