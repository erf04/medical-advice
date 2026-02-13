// src/admin/dto/create-user.dto.ts
import { IsEnum, IsOptional, IsString, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../../users.entity';

export class AdminCreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
  
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
