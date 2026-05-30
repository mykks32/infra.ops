import { RedisConfig } from './redis.config';
import { KafkaConfig } from './kafka.config';
import { AppConfig } from './app.config';
import { MongoConfig } from './mongo.config';

export const Config = [AppConfig, RedisConfig, KafkaConfig, MongoConfig];
