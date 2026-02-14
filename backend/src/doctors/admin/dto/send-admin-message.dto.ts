import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class SendAdminMessageDto {
  @IsNumber()
  adminId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
   
    @IsNumber()
  doctorId: number;

  @IsOptional()
  @IsEnum(['INFO', 'WARNING', 'SETTLEMENT', 'SYSTEM'])
  type?: string;
}
