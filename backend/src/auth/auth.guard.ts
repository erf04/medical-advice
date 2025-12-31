
import {
  CanActivate,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserOut } from '../users/user.dto';
import { User } from '../users/users.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UsersService } from './../users/users.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService:ConfigService,
        private userService:UsersService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET')
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.userService.findOneByPhone(payload.phoneNumber)
      if (!user)
        throw new UnauthorizedException()
      const userDto = plainToInstance(UserOut, user,{excludeExtraneousValues:true});
      const response = instanceToPlain(userDto); // computed getters like isAdmin are included
      request['user'] = response;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
