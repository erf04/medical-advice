import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../../auth/auth.decorator';
import { SettleService } from './settle.service';
import { RolesGuard } from '../../auth/roles.guard';
import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../../users/users.entity';

@Controller('settlements')
@UseGuards(AuthGuard, RolesGuard)
export class SettleController {
  constructor(private readonly settleService: SettleService) {}
  @Post(':id/request-settlement')
  @Roles(UserRole.DOCTOR)
  async requestSettlement(@Param('id') id: number, @GetUser() user) {
    return this.settleService.requestSettlement(+id, user.id);
  }

  @Post(':id/settlement-status')
  @Roles(UserRole.ADMIN)
  async approveSettlement(
    @Param('id') id: number,
    @Body('status') status: 'APPROVED' | 'REJECTED',
  ) {
    return this.settleService.approveSettlement(+id, status);
  }

  @Get('all')
  @Roles(UserRole.ADMIN)
  async getSettlements() {
    return this.settleService.getAllSettlements();
  }
}
