
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateDoctorProfileDto {
  @IsString()
  @IsNotEmpty()
  medicalCode: string;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  maxConcurrentConsultations?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  consultationPrice?: number;

  @IsNumber()
  @Min(1)
  category:number;
}
