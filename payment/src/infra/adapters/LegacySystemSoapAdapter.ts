import { IPaymentSender } from "@/domain/ports/IPaymentSender";
import { LegacySystem } from "../legacy/LegacySystem";
import { PaymentDTO, PaymentResult } from "@/types";
import { retryWithExponentialBackoff } from "@/utils/retry";

export class LegacySystemSoapAdapter extends LegacySystem implements IPaymentSender {
  constructor(wsdlUrl: string) {
    super(wsdlUrl);
  }

  public async sendPaymentData(payment: PaymentDTO): Promise<PaymentResult> {
    const legacyPayload = this.mapToLegacyPayload(payment);

    const rawResponse = await retryWithExponentialBackoff(
      () => this.processPayment(legacyPayload),
      4,
      500
    );

    return this.mapFromLegacyResponse(rawResponse);
  }

  private mapFromLegacyResponse(raw: any): PaymentResult {
    return {
      success: raw && raw.Status === "OK",
      legacyId: raw?.LegacyPaymentId,
      raw,
    };
  }

  private mapToLegacyPayload(payment: PaymentDTO) {
    return {
      PaymentId: payment.id,
      Amount: payment.amount.toFixed(2),
      Currency: payment.currency,
      CustomerRef: payment.customerId,
      Metadata: JSON.stringify(payment.metadata || {}),
    };
  }
}
