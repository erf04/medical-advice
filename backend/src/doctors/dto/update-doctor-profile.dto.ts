import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateDoctorProfileDto {
  @IsOptional()
  @IsString()
  medicalCode?: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;

  @IsOptional()
  @IsNumber()
  category?: number;

  @IsOptional()
  @IsNumber()
  maxConcurrentConsultations?: number;
}
