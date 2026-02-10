import { BadRequestException, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { profileImageStorage } from '../common/multer/profile-image.storage';
import { GetUser } from '../auth/auth.decorator';
import { User } from './users.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('profile-image')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: profileImageStorage,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    const imagePath = `/uploads/users/${file.filename}`;

    await this.userService.updateProfileImage(user.id, imagePath);

    return {
      message: 'Profile image updated',
      profileImage: imagePath,
    };
  }
}
