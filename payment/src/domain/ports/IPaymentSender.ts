import { PaymentDTO, PaymentResult } from "@/types";

export interface IPaymentSender {
  // Operação de negócio que a aplicação espera
  sendPaymentData(payment: PaymentDTO, opts?: { idempotencyKey?: string }): Promise<PaymentResult>;
}