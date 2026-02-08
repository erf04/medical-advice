import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConsultationService } from './consultations.service';
import { GetUser } from '../auth/auth.decorator';
import { User } from '../users/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ReserveConsultationDto } from './dto/create-consultation.dto';

@Controller('consultations')
@UseGuards(AuthGuard)
export class ConsultationsController {
  constructor(
    private readonly consultationService: ConsultationService,
  ) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() dto: ReserveConsultationDto,
  ) {
    return this.consultationService.reserve(dto, user);
  }
}
