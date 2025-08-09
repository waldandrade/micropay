import { PaymentService } from '@/app/services/PaymentService';
import { LegacySystemSoapAdapter } from '@/infra/adapters/LegacySystemSoapAdapter';
import { IntegrationController } from '@/infra/controllers/IntegrationController';
import { InMemoryIdempotencyStore } from '@/infra/persistence/idempotency/InMemoryIdempotencyStore';
import { Router } from 'express';

export default (router: Router): void => {
  const wsdl = process.env.LEGACY_WSDL || "https://legacy.example/wsdl?wsdl";
  const legacySystem = new LegacySystemSoapAdapter(wsdl);
  const idempStore = new InMemoryIdempotencyStore();
  
  router.post('/payment', async (req, res) => {
    const controller = new IntegrationController(new PaymentService(idempStore, legacySystem));
    return controller.sendPaymentData(req, res);
  });
}