import { Request, Response } from 'express';
import { PaymentDTO } from '@/types';
import { PaymentService } from '@/app/services/PaymentService';

export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  async sendPaymentData (req: Request, res: Response): Promise<void> {
    const idempotencyKey = req.header("Idempotency-Key") || req.body.idempotencyKey;
    const payment = req.body as PaymentDTO;
    try {
      const result = await this.service.sendPaymentData(payment, idempotencyKey);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
