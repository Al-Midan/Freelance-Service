export interface SkillPaymentRequest {
    sender: string;
    receiver: string;
    amount: number;
    paymentId: string;
    timestamp: Date;
  }