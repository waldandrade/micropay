import { AuthController } from "@/infra/controllers/authController";

class Response {
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

describe('Auth Controller', () => {
  it('Should return 400 when provider is invalid', async () => {
    const controller = new AuthController();
    const response = new Response();
    await controller.login({ body: {}}, response);
    expect(response.responseStatus).toBe(400);
  });

  it('Should return token from GoogleAuth', async () => {
    const controller = new AuthController();
    const response = new Response();
    await controller.login({ body: {
      provider: 'google',
      credentials: {
        token: 'google_valid_token_123',
      }
    }}, response);
    expect(response.responseStatus).toBe(200);
    expect(response.responseData.token).toEqual('valid_token');
    expect(response.responseData.provider).toEqual('google');
  });

  it('Should return token from AzureAuth', async () => {
    const controller = new AuthController();
    const response = new Response();
    await controller.login({ body: {
      provider: 'azure',
      credentials: {
        username: 'admin',
        password: 'Admin@123',
      }
    }}, response);
    expect(response.responseStatus).toBe(200);
    expect(response.responseData.token).toEqual('valid_token');
    expect(response.responseData.provider).toEqual('azure');
  });

  afterAll(async () => {
    jest.clearAllMocks();
  })
});