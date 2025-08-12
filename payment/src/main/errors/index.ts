export class InvalidProviderError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidProviderError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}
