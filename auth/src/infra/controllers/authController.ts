import { Request, Response } from 'express';
import { AuthenticateUser } from '@/domain/usecases/authenticateUser';
import { GoogleAuthProvider } from '@/infra/adapters/auth/GoogleAuthProvider';
import { AzureAuthProvider } from '@/infra/adapters/auth/AzureAuthProvider';

export class AuthController {
  async login(req: Request, res: Response): Promise<any> {
    const data = req.body;
    
    let authProvider;
    switch (data.provider) {
      case 'google':
        authProvider = new GoogleAuthProvider();
        break;
      case 'azure':
        authProvider = new AzureAuthProvider();
        break;
      default:
        return res.status(400).json({ message: 'Invalid provider' });
    }

    const usecase = new AuthenticateUser(authProvider);

    try {
      const { token, provider } = await usecase.execute(data.credentials);
      return res.json({ token, provider });
    } catch (err: any) {
      return res.status(401).json({ message: err.message });
    }

  }
}