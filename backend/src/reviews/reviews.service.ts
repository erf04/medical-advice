import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  Consultation,
  ConsultationStatus,
} from '../consultations/consultation.entity';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorProfile } from '../doctors/doctor-profile.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Consultation)
    private readonly consultationRepo: Repository<Consultation>,
    @InjectRepository(DoctorProfile)
    private readonly doctorRepo: Repository<DoctorProfile>,
  ) {}

  async reviewConsultation(consultationId: number, dto: CreateReviewDto) {
    const consultation = await this.consultationRepo.findOne({
      where: { id: consultationId },
      relations: ['doctor', 'doctor.user', 'patient', 'patient.user'],
    });

    if (!consultation) throw new NotFoundException();

    if (consultation.status !== ConsultationStatus.FINISHED)
      throw new BadRequestException('Consultation not finished yet');

    // Prevent double review
    const existing = await this.reviewRepo.findOne({
      where: { consultation: { id: consultationId } },
    });

    if (existing) throw new BadRequestException('Already reviewed');

    const review = this.reviewRepo.create({
      consultation,
      doctor: consultation.doctor,
      patient: consultation.patient.user,
      rating: dto.rating,
      comment: dto.comment,
    });

    await this.reviewRepo.save(review);

    // 🔥 Update doctor average rating
    await this.updateDoctorRating(consultation.doctor.id);

    return review;
  }

  async updateDoctorRating(doctorId: number) {
    const reviews = await this.reviewRepo.find({
      where: { doctor: { id: doctorId } },
    });

    const total = reviews.length;

    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / total;

    await this.doctorRepo.update(doctorId, {
      averageRating: Number(avg.toFixed(2)),
      totalReviews: total,
    });
  }

  async getAllReviews(){
    return this.reviewRepo.find({
      relations: ['doctor', 'doctor.user', 'patient','patient.user'],
      order: { createdAt: 'DESC' },
    });
  }
}
