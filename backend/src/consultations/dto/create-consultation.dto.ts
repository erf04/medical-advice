export class ReserveConsultationDto {
  doctorId: number;
  scheduleId: number;

  // Jalali date from UI
  reservedDateJalali: string; // YYYY/MM/DD

  patientId: number; // allows reserving for others
  paymentMethod: 'WALLET' | 'DIRECT';
  subject: string;
  description: string;
}