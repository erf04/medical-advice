import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { DoctorScheduleService } from "./doctor-schedule.service";
import dayjs from "../common/dayjs";
import { AuthGuard } from "../auth/auth.guard";

@Controller('doctors/:id')
@UseGuards(AuthGuard)
export class DoctorAvailabilityController {
  constructor(
    private readonly availabilityService: DoctorScheduleService,
  ) {}

  @Get('available-days')
  getDays(
    @Param('id') doctorId: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.availabilityService.getAvailableDays(
      doctorId,
      from,
      to,
    );
  }

  @Get('available-slots')
  getSlots(
    @Param('id') doctorId: number,
    @Query('date') jalaliDate: string,
  ) {

    return this.availabilityService.getAvailableSlots(
      doctorId,
      jalaliDate,
    );
  }
}
