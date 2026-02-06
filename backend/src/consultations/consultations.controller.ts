import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConsultationService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { GetUser } from '../auth/auth.decorator';
import { User } from '../users/users.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('consultations')
@UseGuards(AuthGuard)
export class ConsultationsController {
  constructor(
    private readonly consultationService: ConsultationService,
  ) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() dto: CreateConsultationDto,
  ) {
    return this.consultationService.create(user, dto);
  }
}
