// src/doctors/doctor-schedule.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DoctorScheduleService } from './doctor-schedule.service';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { User, UserRole } from '../../users/users.entity';
import { SetDoctorScheduleDto } from '../dto/set-doctor-schedule.dto';
import { GetUser } from '../../auth/auth.decorator';
import { AuthGuard } from '../../auth/auth.guard';
import { log } from 'console';

@Controller('doctors/schedule')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)
export class DoctorScheduleController {
  constructor(
    private readonly scheduleService: DoctorScheduleService,
  ) {}

  @Post()
  setSchedule(
    @GetUser() user: User,
    @Body() dto: SetDoctorScheduleDto,
  ) {
    return this.scheduleService.setSchedule(
      user,
      dto,
    );
  }

  @Get()
  getMySchedules(@GetUser() user: User) {
    return this.scheduleService.getMySchedules(
      user,
    );
  }

  @Delete(':dayOfWeek')
  deleteSchedule(
    @GetUser() user: User,
    @Param('dayOfWeek', ParseIntPipe) dayOfWeek: number,
  ) {
    return this.scheduleService.deleteSchedule(
      user,
      dayOfWeek,
    );
  }
}
