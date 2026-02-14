// src/wallet/wallet.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/auth.decorator';
import { log } from 'console';


@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async myWallet(@GetUser() user) {
    return this.walletService.getMyWallet(user);
  }

  @Post('deposit')
  async deposit(
    @GetUser() user,
    @Body('amount') amount: number,
  ) {
    // gateway success assumed
    return this.walletService.depositByGateway(
      user,
      amount,
      Date.now() % 1_000_000 , // symbolic reference
    );
  }

  @Get('transactions')
  async getTransactions(@GetUser() user) {
    return this.walletService.getTransactionsByWallet(
      user.id
    );
  }

  @Get(':id/')
  async getWalletByUserId(@Body('userId') userId:number) {
    return this.walletService.getWalletByUserId(userId);
  }

  @Get('transactions/:id')
  async getWalletTransactionsByUserId(@Body('userId') userId:number) {
    return this.walletService.getTransactionsByWallet(userId);
  }
}
