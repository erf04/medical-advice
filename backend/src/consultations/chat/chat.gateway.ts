import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Consultation, ConsultationStatus } from '../consultation.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { ConsultationMessage } from './consultation-message.entity';
import { ConsultationService } from '../consultations.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { TempFile } from './temp-file.entity';
import { promises } from 'fs';

@WebSocketGateway()
@Injectable()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Consultation)
    private consultationRepo: Repository<Consultation>,

    @InjectRepository(ConsultationMessage)
    private messageRepo: Repository<ConsultationMessage>,

    private consultationService: ConsultationService,
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService,
    @InjectRepository(TempFile)
    private tempFileRepo: Repository<TempFile>,
  ) {}

  async handleConnection(socket: Socket) {
    log('New client connected: ' + socket.id);
    const token = socket.handshake.auth.token;
    const consultationId = socket.handshake.query.consultationId as string;

    if (!consultationId) {
      log('in handleConnection: Missing consultationId');
      socket.disconnect();
      return;
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    const user = await this.userService.findOneByPhone(payload.phoneNumber);
    // log('User found:', user);
    if (!user) {
      log('in handleConnection: User not found for token payload', payload);
      socket.disconnect();
      return;
    }

    const consultation = await this.consultationService.findById(
      Number(consultationId),
    );

    // log('Consultation found:', consultation);

    if (!consultation || consultation.status !== 'ACTIVE') {
      log('in handleConnection: Consultation not found or not active for id', consultationId);
      socket.disconnect();
      return;
    }

    // 🔥 Join room
    const room = `consultation:${consultationId}`;
    socket.join(room);

    // 🔥 Store consultationId inside socket
    socket.data.consultation = consultation ;
    socket.data.user = user;

    log('Client', socket.id, 'joined room', room);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody()
    body: {
      text?: string;
      fileToken?: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    const consultationId = socket.data.consultation.id;
    const userId = socket.data.user.id;
    log('Received message from user', userId, 'in consultation', consultationId, ':', body);
    if (!body.text && !body.fileToken) {
      throw new WsException('Empty message');
    }


    let fileData;
    if (body.fileToken) {
      const tempFile = await this.tempFileRepo.findOne({
        where: { token: body.fileToken },
      });
      if (!tempFile) throw new WsException('Invalid file token');

    //   if (tempFile.uploadedBy !== userId)
    //     throw new WsException('Unauthorized file usage');

    //   if (tempFile.expiresAt < new Date())
    //     throw new WsException('File token expired');

      // Move file from tmp → consultations
      const newPath = tempFile.filePath.replace('/tmp/', '/consultations/');

      await promises.rename(tempFile.filePath, newPath);
    
      fileData = {
        fileName: tempFile.fileName,
        filePath: newPath.replace('uploads', '/uploads'),
        fileSize: tempFile.fileSize,
        fileMimeType: tempFile.fileMimeType,
      };
      await this.tempFileRepo.delete({ id: tempFile.id });
    }

    const message = this.messageRepo.create({
      consultation: socket.data.consultation,
      sender: socket.data.user,
      content: body.text ?? null,
      ...fileData,
    });

    await this.messageRepo.save(message);

    this.server
      .to(`consultation:${consultationId}`)
      .emit('new_message', message);
  }
}
