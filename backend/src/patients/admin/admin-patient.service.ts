import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientProfile } from '../patient-profile.entity';
import { User } from '../../users/users.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';



@Injectable()
export class AdminPatientService {
  constructor(
    @InjectRepository(PatientProfile)
    private readonly patientRepo: Repository<PatientProfile>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreatePatientDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const patient = this.patientRepo.create({
      age: dto.age,
      gender: dto.gender,
      user,
    });

    return this.patientRepo.save(patient);
  }

  async findAll() {
    return this.patientRepo.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async update(id: number, dto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepo.findOne({
        where: { id: dto.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      patient.user = user;
    }

    if (dto.age !== undefined) {
      patient.age = dto.age;
    }

    if (dto.gender !== undefined) {
      patient.gender = dto.gender;
    }

    return this.patientRepo.save(patient);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    return this.patientRepo.remove(patient);
  }
}
