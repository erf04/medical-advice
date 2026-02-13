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
import { User, UserRole } from '../users/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ReserveConsultationDto } from './dto/create-consultation.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('consultations')
export class ConsultationsController {
  constructor(
    private readonly consultationService: ConsultationService,
  ) {}

  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  create(
    @GetUser() user: User,
    @Body() dto: ReserveConsultationDto,
  ) {
    return this.consultationService.reserve(dto, user);
  }

  @Post(':id/start')
  @UseGuards(AuthGuard,RolesGuard)
  startConsultation(
    @GetUser() user: User,
    @Param('id') id: number,
  ) {
    return this.consultationService.startConsultation(id, user.id);
  }

  @Get()
  @UseGuards(AuthGuard,RolesGuard)
  getConsultationByUser(@GetUser() user:User){
    return this.consultationService.getConsultationsByUser(user.id)
  }

  @Post(':id/finish')
  async finishConsultation(
    @Param('id') id: number,
  ) {
    return this.consultationService.finishConsultation(
      +id
    );
  }
}
