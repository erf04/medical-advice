// src/admin/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { AdminCreateUserDto } from './create-user.dto';

export class AdminUpdateUserDto extends PartialType(
  AdminCreateUserDto,
) {}
