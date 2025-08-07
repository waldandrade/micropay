export interface AuthProvider {
  authenticate(credentials: any): Promise<AuthResult>;
}

export interface AuthResult {
  id: string;
  email: string;
  name: string;
  username: string;
  token?: string;
  isAdmin: boolean;
}
