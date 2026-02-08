// src/wallet/wallet.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'bigint', default: 0 })
  balance: number; // cached balance (rial / toman integer)

  @CreateDateColumn()
  createdAt: Date;
}
