// src/wallet/wallet.service.ts
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

import { User } from '../users/users.entity';
import { Consultation } from '../consultations/consultation.entity';
import { WalletTransaction, WalletTransactionType } from './transaction/wallet-transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
    @InjectRepository(WalletTransaction)
    private txRepo: Repository<WalletTransaction>,
    private dataSource: DataSource,
  ) {}

  /* ---------- Wallet helpers ---------- */

  async getOrCreateWallet(user: User): Promise<Wallet> {
    let wallet = await this.walletRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (!wallet) {
      wallet = this.walletRepo.create({ user, balance: 0 });
      await this.walletRepo.save(wallet);
    }

    return wallet;
  }

  async getMyWallet(user: User) {
    return this.getOrCreateWallet(user);
  }

  /* ---------- Direct Pay (Gateway → Wallet) ---------- */

  async depositByGateway(
    user: User,
    amount: number,
    referenceId: number,
  ) {
    if (amount <= 0) {
      throw new BadRequestException('Invalid amount');
    }

    return this.dataSource.transaction(async manager => {
      const wallet = await manager.findOneOrFail(Wallet, {
        where: { user: { id: user.id } },
        lock: { mode: 'pessimistic_write' },
      });
      const balanceBefore = Number(wallet.balance);
      const newBalance = balanceBefore + amount;
      wallet.balance =newBalance;
      await manager.save(wallet);

      await manager.save(
        manager.create(WalletTransaction, {
          wallet,
          type: WalletTransactionType.DEPOSIT,
          amount,
          referenceType: 'DEPOSIT',
          referenceId,
        }),
      );

      return wallet;
    });
  }

  /* ---------- Pay consultation (Wallet) ---------- */

  async payConsultationWithWallet(
    user: User,
    consultation: Consultation,
  ) {
    return this.dataSource.transaction(async manager => {
      const wallet = await manager.findOneOrFail(Wallet, {
        where: { user: { id: user.id } },
        lock: { mode: 'pessimistic_write' },
      });

      if (!wallet || wallet.balance < consultation.price) {
        throw new BadRequestException(
          'Insufficient wallet balance',
        );
      }

      wallet.balance -= consultation.price;
      await manager.save(wallet);

      await manager.save(
        manager.create(WalletTransaction, {
          wallet,
          type: WalletTransactionType.CONSULTATION_PAY,
          amount: consultation.price,
          referenceType: 'CONSULTATION',
          referenceId: consultation.id,
        }),
      );
    });
  }

  /* ---------- Settle consultation (Doctor earning) ---------- */

  async settleConsultation(
    consultation: Consultation,
  ) {
    return this.dataSource.transaction(async manager => {
      const doctorUser =
        consultation.doctor.user;

      const wallet = await manager.findOneOrFail(Wallet, {
        where: { user: { id: doctorUser.id } },
        lock: { mode: 'pessimistic_write' },
      });

      const doctorShare =
        Math.floor(
          Number(consultation.price) *
            (100 - Number(consultation.commissionPercent)) /
            100,
        );
      const balanceBefore = Number(wallet.balance);
      const newBalance = balanceBefore + doctorShare;
      wallet.balance = newBalance;
      await manager.save(wallet);

      await manager.save(
        manager.create(WalletTransaction, {
          wallet,
          type: WalletTransactionType.CONSULTATION_EARN,
          amount: doctorShare,
          referenceType: 'CONSULTATION',
          referenceId: consultation.id,
        }),
      );
      return wallet;
    });
  }

  /* ---------- Refund ---------- */

  async refundConsultation(
    consultation: Consultation,
  ) {
    return this.dataSource.transaction(async manager => {
      const wallet = await manager.findOneOrFail(Wallet, {
        where: {
          user: {
            id: consultation.patient.user.id,
          },
        },
        lock: { mode: 'pessimistic_write' },
      });

      wallet.balance += consultation.price;
      await manager.save(wallet);

      await manager.save(
        manager.create(WalletTransaction, {
          wallet,
          type: WalletTransactionType.REFUND,
          amount: consultation.price,
          referenceType: 'CONSULTATION',
          referenceId: consultation.id,
        }),
      );
    });
  }

  async getTransactionsByWallet(userId: number) {
    return this.txRepo.find({
      where: { wallet: { user: { id: userId } } },
      order: { createdAt: 'DESC' },
    });
  }
}
