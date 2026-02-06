// src/consultations/dto/create-consultation.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateConsultationDto {
  @IsInt()
  doctorId: number;

  @IsInt()
  patientProfileId: number;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  description?: string;
}
