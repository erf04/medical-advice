// src/doctors/dto/set-doctor-schedule.dto.ts
import {
  IsInt,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class SetDoctorScheduleDto {
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime: string;
}
