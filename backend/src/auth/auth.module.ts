import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      })
    }),
    forwardRef(() => WalletModule),
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard,RolesGuard],
  exports:[AuthService,AuthGuard,RolesGuard,JwtModule, forwardRef(() => UsersModule)],
})
export class AuthModule {}
