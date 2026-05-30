import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Typed wrapper around NestJS ConfigService.
 * Provides strongly-typed getters for every config namespace
 * so callers never need to remember string keys.
 */
@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  // App
  get port(): number {
    return this.config.getOrThrow<number>('app.port');
  }

  get nodeEnv(): string {
    return this.config.getOrThrow<string>('app.nodeEnv');
  }

  get isDevelopment(): boolean {
    return this.config.getOrThrow<boolean>('app.isDevelopment');
  }

  get isProduction(): boolean {
    return this.config.getOrThrow<boolean>('app.isProduction');
  }

  // Redis
  get redisUrl(): string {
    return this.config.getOrThrow<string>('redis.redisUrl');
  }

  // Mongo
  get mongoUrl(): string {
    return this.config.getOrThrow<string>('mongo.mongoUrl');
  }

  // Kafka
  get kafkaBroker(): string {
    return this.config.getOrThrow<string>('kafka.kafkaBroker');
  }

  get kafkaClientId(): string {
    return this.config.getOrThrow<string>('kafka.clientId');
  }

  get kafkaGroupId(): string {
    return this.config.getOrThrow<string>('kafka.groupId');
  }
}
