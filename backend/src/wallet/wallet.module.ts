import { Module, forwardRef } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletTransaction } from './transaction/wallet-transaction.entity';
import { Wallet } from './wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransaction]),
    forwardRef(() => AuthModule),
    // forwardRef(() => UsersModule),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
