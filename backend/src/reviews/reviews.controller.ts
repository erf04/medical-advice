import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetUser } from '../auth/auth.decorator';
import { ConsultationService } from './../consultations/consultations.service';
import { ReviewsService } from './reviews.service';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/users.entity';

@Controller('reviews')
@UseGuards(AuthGuard,RolesGuard)
export class ReviewsController {

   constructor(
    private reviewService:ReviewsService
   ){} 
  @Post(':id/review')
  @Roles(UserRole.PATIENT)
  async reviewConsultation(
    @Param('id') id: number,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewService.reviewConsultation(+id, dto);
  }

  @Get('all')
  @Roles(UserRole.ADMIN)
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }
}
