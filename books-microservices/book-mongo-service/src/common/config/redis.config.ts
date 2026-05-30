import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('RedisConfig');

export const RedisConfig = registerAs('redis', () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    logger.error('Missing env: REDIS_URL');
    process.exit(1);
  }

  return { redisUrl };
});
