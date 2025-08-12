/*
import { IntegrationController } from "@/infra/controllers/IntegrationController";

jest.mock('@/domain/usecases/authenticateUser', () => {
  const actual = jest.requireActual('@/domain/usecases/authenticateUser');
  return {
    AuthenticateUser: class extends actual.AuthenticateUser {
      async execute(credentials: any) {
        const user = await this.provider.authenticate(credentials);
        return {
          ...user,
          token: 'valid_token'
        };
      }
    }
  };
});
*/
import { Request, Response } from "express";

class MockResponse {
  responseStatus: number = 200;
  responseData: any;

  status(value) {
    this.responseStatus = value;
    return this;
  }

  json(value) {
    this.responseData = value;
    return this;
  }
}

import { PaymentService } from "@/app/services/PaymentService";
import { LegacySystemSoapAdapter } from "@/infra/adapters/LegacySystemSoapAdapter";
import { PaymentController } from "@/infra/controllers/paymentController";
import { InMemoryIdempotencyStore } from "@/infra/persistence/idempotency/InMemoryIdempotencyStore";

describe('Auth Controller', () => {
  it('Should return 400 when provider is invalid', async () => {
    const wsdl = process.env.LEGACY_WSDL || "https://legacy.example/wsdl?wsdl";
    const legacySystem = new LegacySystemSoapAdapter(wsdl);
    const idempStore = new InMemoryIdempotencyStore();
    const controller = new PaymentController(new PaymentService(idempStore, legacySystem));
    const response = new MockResponse();
    await controller.sendPaymentData({ body: {}} as Request, response as unknown as Response);
    expect(response.responseStatus).toBe(400);
  });

  /*

  it('Should return token from GoogleAuth', async () => {
    const controller = new AuthController();
    const response = new MockResponse();
    await controller.login({ body: {
      provider: 'google',
      credentials: {
        token: 'google_valid_token_123',
      }
    }} as Request, response as unknown as Response);
    expect(response.responseStatus).toBe(200);
    expect(response.responseData.token).toEqual('valid_token');
    expect(response.responseData.provider).toEqual('google');
  });

  it('Should return token from AzureAuth', async () => {
    const controller = new AuthController();
    const response = new MockResponse();
    await controller.login({ body: {
      provider: 'azure',
      credentials: {
        username: 'admin',
        password: 'Admin@123',
      }
    }} as Request, response as unknown as Response);
    expect(response.responseStatus).toBe(200);
    expect(response.responseData.token).toEqual('valid_token');
    expect(response.responseData.provider).toEqual('azure');
  });
  */

  afterAll(async () => {
    jest.clearAllMocks();
  })
});
