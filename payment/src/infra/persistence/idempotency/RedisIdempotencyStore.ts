import { IIdempotencyStore } from "@/domain/idempotency/IIdempotencyStore";

export class RedisIdempotencyStore implements IIdempotencyStore {
  private store = new Map<string, any>();
  async get(key: string) {
    return this.store.get(key);
  }
  async set(key: string, value: any) {
    this.store.set(key, value);
  }
}