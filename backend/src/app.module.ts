import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { CategoriesModule } from './categories/categories.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { WalletModule } from './wallet/wallet.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PatientsModule,
    DoctorsModule,
    CategoriesModule,
    ConsultationsModule,
    WalletModule,
    ReviewsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
