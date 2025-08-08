import { Request, Response } from 'express';
import { GoogleAuthProvider } from '../adapters/auth/GoogleAuthProvider';
import { AzureAuthProvider } from '../adapters/auth/AzureAuthProvider';
import { AuthenticateUser } from '@/domain/usecases/authenticateUser';

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
      const user = await usecase.execute(data.credentials);
      return res.json({ user });
    } catch (err: any) {
      return res.status(401).json({ message: err.message });
    }

  }
}