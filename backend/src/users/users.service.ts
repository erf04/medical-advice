import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
    constructor(private configService:ConfigService){}

    logPort() {
        const port = this.configService.get<number>('PORT');
        // console.log(port);
        return port;
    }
}
