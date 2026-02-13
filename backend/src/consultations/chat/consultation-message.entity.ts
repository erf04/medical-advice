import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Consultation } from '../consultation.entity';
import { User } from '../../users/users.entity';

@Entity()
export class ConsultationMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Consultation, { onDelete: 'CASCADE' })
  consultation: Consultation;

  @ManyToOne(() => User)
  sender: User;


  @Column({ type: 'text', nullable: true })
  content?: string; // for TEXT

  @Column({ nullable: true })
  fileName?: string;

  @Column({ nullable: true })
  filePath?: string;

  @Column({ nullable: true })
  fileSize?: number;

  @Column({ nullable: true })
  fileMimeType?: string;

  @CreateDateColumn()
  createdAt: Date;
}
