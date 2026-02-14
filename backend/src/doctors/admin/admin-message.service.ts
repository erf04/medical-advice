import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsService } from '../doctors.service';
import { SendAdminMessageDto } from './dto/send-admin-message.dto';
import { In, Repository } from 'typeorm';
import { DoctorProfile } from '../doctor-profile.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Consultation } from '../../consultations/consultation.entity';
import { UsersService } from '../../users/users.service';
import { User, UserRole } from '../../users/users.entity';
import { AdminMessage } from './admin-message.entity';

@Injectable()
export class AdminMessageService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorRepo: Repository<DoctorProfile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(AdminMessage)
    private readonly adminMessageRepo: Repository<AdminMessage>,
  ) {}
  async sendMessage(dto: SendAdminMessageDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.adminId , role:UserRole.ADMIN },
    });

    if (!user) throw new NotFoundException('Admin not found');
    const doctor = await this.doctorRepo.findOne({
      where: { id: dto.doctorId },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    const message = this.adminMessageRepo.create({
      admin: user,
      title: dto.title,
      content: dto.content,
      doctor: doctor
    });

    return await this.adminMessageRepo.save(message);

  }

  async getMessagesByAdmin(userId: number) {
    const messages = await this.adminMessageRepo.find({
      where: { admin: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['doctor','admin']
    });
    return messages;
  }

  async getMessagesByDoctor(doctorId: number) {
    const messages = await this.adminMessageRepo.find({
      where: { doctor: { id: doctorId } },
      order: { createdAt: 'DESC' },
        relations: ['doctor','admin']
    });
    return messages;
  }

  async markAsRead(messageId: number) {
    const message = await this.adminMessageRepo.findOne({
      where: { id: messageId },
    });
    if (!message) throw new NotFoundException('Message not found');
    message.isRead = true;
    return await this.adminMessageRepo.save(message);
  }
}
