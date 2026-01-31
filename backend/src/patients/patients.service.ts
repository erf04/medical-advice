
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientProfile } from './patient-profile.entity';
import { User, UserRole } from '../users/users.entity';
import { CreatePatientProfileDto } from './dto/create-profile-patient.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientProfile)
    private patientRepo: Repository<PatientProfile>,
  ) {}

  async createProfile(user: User, dto: CreatePatientProfileDto) {
    if (user.role !== UserRole.PATIENT) {
      throw new ForbiddenException('Only patients can create a profile');
    }   

    const exists = await this.patientRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (exists) {
      throw new BadRequestException('Patient profile already exists');
    }

    const profile = this.patientRepo.create({
      ...dto,
      user,
    });

    return this.patientRepo.save(profile);
  }

  async getMyProfile(user: User) {
    const profile = this.patientRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['user']
    });
    return instanceToPlain(profile)
  }
}
