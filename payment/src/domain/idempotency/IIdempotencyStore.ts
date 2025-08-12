export interface IIdempotencyStore {
  get(key: string): Promise<any | undefined>;
  set(key: string, value: any, ttlSeconds?: number): Promise<void>;
}