import {
  Body,
  Controller,
  Get,
  Param,
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

  @Post(':id/start')
  startConsultation(
    @GetUser() user: User,
    @Param('id') id: number,
  ) {
    return this.consultationService.startConsultation(id, user.id);
  }

  @Get()
  getConsultationByUser(@GetUser() user:User){
    return this.consultationService.getConsultationsByUser(user.id)
  }
}
