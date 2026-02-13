import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Consultation, ConsultationStatus } from '../consultation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettleRequest } from './settle-req.entity';
import { WalletService } from '../../wallet/wallet.service';

@Injectable()
export class SettleService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepo: Repository<Consultation>,
    @InjectRepository(SettleRequest)
    private readonly settleRequestRepo: Repository<SettleRequest>,
    private readonly walletService: WalletService,
  ) {}

  async requestSettlement(consultationId: number, userId: number) {
    const consultation = await this.consultationRepo.findOne({
      where: { id: consultationId },
      relations: ['doctor', 'doctor.user'],
    });

    if (!consultation) throw new NotFoundException();

    if (consultation.status !== ConsultationStatus.FINISHED)
      throw new BadRequestException('Consultation not completed');

    if (consultation.doctor.user.id !== userId) throw new ForbiddenException();

    const existing = await this.settleRequestRepo.findOne({
      where: { consultation: { id: consultationId } },
    });

    if (existing) throw new BadRequestException('Settlement already requested');

    const request = this.settleRequestRepo.create({
      consultation,
      doctor: consultation.doctor,
    });

    await this.settleRequestRepo.save(request);

    consultation.status = ConsultationStatus.SETTLEMENT_REQUESTED;

    await this.consultationRepo.save(consultation);

    return request;
  }

  async approveSettlement(requestId: number, status: 'APPROVED' | 'REJECTED') {
    const request = await this.settleRequestRepo.findOne({
      where: { id: requestId },
      relations: [
        'consultation',
        'consultation.patient',
        'consultation.doctor',
        'consultation.doctor.user',
        'consultation.patient.user',
      ],
    });

    if (!request) throw new NotFoundException('Settlement request not found');

    request.adminResponse = status;
    const savedRequest = await this.settleRequestRepo.save(request);

    const consultation = savedRequest.consultation;
    if (savedRequest.adminResponse === 'REJECTED') {
      consultation.status = ConsultationStatus.FINISHED;
      await this.consultationRepo.save(consultation);
      return savedRequest;
    }
    else if (savedRequest.adminResponse === 'APPROVED') {
        if (consultation.status === ConsultationStatus.SETTLED) {
          throw new BadRequestException('Consultation already settled');
        }
        if (consultation.status !== ConsultationStatus.SETTLEMENT_REQUESTED) {
          throw new BadRequestException('Consultation not in settlement requested state');
        }

        await this.walletService.settleConsultation(consultation);
        consultation.status = ConsultationStatus.SETTLED;
        await this.consultationRepo.save(consultation);
        return savedRequest;
    }

  }

  async getAllSettlements() {
    return this.settleRequestRepo.find({
      relations: [
        'consultation',
        'consultation.patient',
        'consultation.doctor',
      ],
    });
  }

}
