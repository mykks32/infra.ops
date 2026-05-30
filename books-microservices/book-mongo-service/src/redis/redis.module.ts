import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientType, createClient } from 'redis';

import { RedisRepository } from './redis.repository';
import { RedisService } from './redis.service';
import { PROVIDER } from './redis.constant';
import { AppConfigService } from '../config/config.service';

const logger = new Logger('RedisModule');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PROVIDER.redis,
      inject: [AppConfigService],
      useFactory: async (cfg: AppConfigService): Promise<RedisClientType> => {
        const redisUrl = cfg.redisUrl;

        const client = createClient({
          url: redisUrl,
        });

        // events
        client.on('connect', () => logger.log('Redis connecting...'));

        client.on('ready', () => logger.log('Redis ready'));

        client.on('end', () => logger.warn('Redis connection closed'));

        client.on('error', (err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);

          logger.error(`Redis error: ${message}`);
        });

        // connect
        await client.connect();

        logger.log('Redis client initialized successfully');

        return client;
      },
    },
    RedisRepository,
    RedisService,
  ],
  exports: [PROVIDER.redis, RedisRepository, RedisService],
})
export class RedisModule {}
