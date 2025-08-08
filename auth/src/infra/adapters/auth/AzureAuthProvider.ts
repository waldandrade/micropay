import { AuthProvider, AuthResult } from "@/main/ports/AuthProvider";


class MockedUserPasswordClient {
  async verifyIdToken(username: string, password: string): Promise<any> {
    if (username === "admin" && password === "Admin@123") {
      return {
        id: 98765,
        username,
        email: 'admin@user.net',
        name: "User Admin",
        isAdmin: true
      };
    }

    if (username === "john.doe" && password === "Test@123") {
      return {
        id: 12345,
        username,
        email: 'valid@user.net',
        name: "User Valid",
        isAdmin: false
      };
    }

    return null;
  }
}
// Simulação de chamada real à Azure AD
export class AzureAuthProvider implements AuthProvider {
  private client = new MockedUserPasswordClient();
  async authenticate(credentials: { username: string; password: string }): Promise<AuthResult> {
    const { username, password } = credentials;
    const payload = await this.client.verifyIdToken(username, password);
    if (!payload) {
      throw new Error("Invalid username or passowrd");
    }

    return {
      id: payload.sub!,
      email: payload.email,
      username: payload.username,
      name: payload.name || '',
      isAdmin: payload.isAdmin
    };
  }
}
