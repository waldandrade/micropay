import { AuthProvider } from "@/main/ports/AuthProvider";
import { GoogleAuthProvider } from "./GoogleAuthProvider";
import { AzureAuthProvider } from "./AzureAuthProvider";
import { InvalidProviderError } from "@/main/errors";

export class AuthProviderFactory {
  static create(provider: string): AuthProvider {
    switch (provider.toLowerCase()) {
      case 'google':
        return new GoogleAuthProvider();
      case 'azure':
        return new AzureAuthProvider();
      default:
        throw new InvalidProviderError(`Invalid provider: ${provider}`);
    }
  }
}
