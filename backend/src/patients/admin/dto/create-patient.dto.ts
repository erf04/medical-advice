import { IsNumber, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  age: number;

  @IsString()
  gender: string;
}
