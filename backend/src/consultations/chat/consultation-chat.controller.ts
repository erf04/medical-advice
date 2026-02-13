import {
    BadRequestException,
  Controller,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { diskStorage } from 'multer';
import { ConsultationChatService } from './consultation-chat.service';
import { GetUser } from '../../auth/auth.decorator';
import { User } from '../../users/users.entity';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('consultations/chat')
@UseGuards(AuthGuard)
export class ConsultationChatController {
  constructor(private consultationChatService: ConsultationChatService) {}

  @Post('upload-temp')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/tmp',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          const ext = file.originalname.split('.').pop();
          cb(null, `${uniqueName}.${ext}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (!allowedTypes.includes(file.mimetype)) {
          cb(new BadRequestException('Invalid file type'), false);
        }

        cb(null, true);
      },
    }),
  )
  async uploadTempFile(@UploadedFile() file: Express.Multer.File, @GetUser() user: User) {
    return this.consultationChatService.createTempFileToken(file, user.id);
  }
}
