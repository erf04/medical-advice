import { Module, forwardRef } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletTransaction } from './transaction/wallet-transaction.entity';
import { Wallet } from './wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransaction]),
    forwardRef(() => AuthModule),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
