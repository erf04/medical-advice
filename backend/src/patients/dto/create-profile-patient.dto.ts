import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePatientProfileDto {
  @IsNumber()
  @Min(0)
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
