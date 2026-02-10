import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOut } from './user.dto';

@Injectable()
@Global()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByPhone(phoneNumber: string) {
    return this.userRepository.findOneBy({ phone: phoneNumber });
  }

  async save(user: User) {
    return this.userRepository.save(user);
  }

  async updateProfileImage(userId: number, profileImage: string) {
    await this.userRepository.update(userId, { profileImage });
  }
}
