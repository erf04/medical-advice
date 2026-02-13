import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Consultation, ConsultationStatus } from '../consultation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationMessage } from './consultation-message.entity';
import { Repository } from 'typeorm';
import { UsersService } from './../../users/users.service';
import { User } from '../../users/users.entity';
import { randomUUID } from 'crypto';
import { TempFile } from './temp-file.entity';

@Injectable()
export class ConsultationChatService {
  constructor(
    @InjectRepository(ConsultationMessage)
    private readonly messageRepo: Repository<ConsultationMessage>,
    @InjectRepository(Consultation)
    private readonly repo: Repository<Consultation>,
    private readonly userService: UsersService,
    @InjectRepository(TempFile)
    private readonly tempFileRepo: Repository<TempFile>,
  ) {}

  async createTempFileToken(file: Express.Multer.File, userId: number) {
    const token = randomUUID();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // expires in 15 min

    const tempFile = this.tempFileRepo.create({
      token,
      filePath: file.path,
      fileName: file.originalname,
      fileSize: file.size,
      fileMimeType: file.mimetype,
      uploadedBy: userId,
      expiresAt,
    });

    await this.tempFileRepo.save(tempFile);

    return {
      fileToken: token,
      fileName: file.originalname,
      fileSize: file.size,
      fileMimeType: file.mimetype,
    };
  }
}
