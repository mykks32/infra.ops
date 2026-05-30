import { type RedisClientType } from 'redis';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from './redis.constant';

@Injectable()
export class RedisRepository {
  constructor(
    @Inject(PROVIDER.redis)
    private readonly client: RedisClientType,
  ) {}

  // STRING OPERATIONS
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<string | null> {
    return ttlSeconds
      ? this.client.set(key, value, { EX: ttlSeconds })
      : this.client.set(key, value);
  }

  async del(...keys: [string, ...string[]]): Promise<number> {
    return this.client.del(keys);
  }
}
