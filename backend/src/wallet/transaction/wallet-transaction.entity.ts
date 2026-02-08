// src/wallet/wallet-transaction.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Wallet } from '../wallet.entity';


export enum WalletTransactionType {
  DEPOSIT = 'DEPOSIT',
  CONSULTATION_PAY = 'CONSULTATION_PAY',
  CONSULTATION_EARN = 'CONSULTATION_EARN',
  WITHDRAW = 'WITHDRAW',
  REFUND = 'REFUND',
  COMMISSION = 'COMMISSION',
}

@Entity()
@Index(['referenceType', 'referenceId'])
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wallet, { onDelete: 'CASCADE' })
  wallet: Wallet;

  @Column({ type: 'enum', enum: WalletTransactionType })
  type: WalletTransactionType;

  @Column('bigint')
  amount: number; // ALWAYS positive

  @Column()
  referenceType: 'CONSULTATION' | 'DEPOSIT' | 'WITHDRAW';

  @Column()
  referenceId: number;

  @CreateDateColumn()
  createdAt: Date;
}
