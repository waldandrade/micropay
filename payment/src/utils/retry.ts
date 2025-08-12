export async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  attempts = 4,
  baseDelayMs = 300
): Promise<T> {
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      const last = i === attempts - 1;
      if (last) throw err;
      const backoff = baseDelayMs * 2 ** i;
      const jitter = Math.floor(Math.random() * baseDelayMs);
      await delay(backoff + jitter);
    }
  }

  throw new Error("retry failed");
}
