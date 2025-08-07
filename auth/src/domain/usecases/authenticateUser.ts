import { AuthProvider, AuthResult } from "@/main/ports/AuthProvider";

export class AuthenticateUser {
  constructor(private readonly provider: AuthProvider) {}

  async execute(credentials: any): Promise<AuthResult> {
    return this.provider.authenticate(credentials);
  }
}
