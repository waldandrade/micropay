import { IIdempotencyStore } from "@/domain/idempotency/IIdempotencyStore";
import { IPaymentSender } from "@/domain/ports/IPaymentSender";
import { PaymentDTO, PaymentResult } from "@/types";

export class PaymentService {
  constructor(
    private readonly idempotencyStore: IIdempotencyStore,
    private readonly paymentSender: IPaymentSender
  ) {}

  async sendPaymentData(payment: PaymentDTO, idempotencyKey?: string): Promise<PaymentResult> {
    if (idempotencyKey) {
      const existing = await this.idempotencyStore.get(idempotencyKey);
      if (existing) return existing;
    }

    const result = await this.paymentSender.sendPaymentData(payment);

    if (idempotencyKey) {
      await this.idempotencyStore.set(idempotencyKey, result);
    }

    return result;
  }
}
