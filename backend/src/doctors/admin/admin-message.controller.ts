import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SendAdminMessageDto } from './dto/send-admin-message.dto';
import { AdminMessageService } from './admin-message.service';
import { GetUser } from '../../auth/auth.decorator';

@Controller('admin/messages')
export class AdminMessageController {
  constructor(private readonly adminMessageService: AdminMessageService) {}

  @Post()
  async sendMessage(@Body() dto: SendAdminMessageDto) {
    return this.adminMessageService.sendMessage(dto);
  }

  @Get('me/:adminId')
  async getMyMessages(@Param('adminId') adminId: number) {
    return this.adminMessageService.getMessagesByAdmin(adminId);
  }

  @Get('doctor/me/:doctorId')
  async getMyDoctorMessages(@Param('doctorId') doctorId: number) {
    return this.adminMessageService.getMessagesByDoctor(doctorId);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: number) {
    return this.adminMessageService.markAsRead(id);
  }


}
