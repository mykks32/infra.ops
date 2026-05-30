import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('MongoConfig');

export const MongoConfig = registerAs('mongo', () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    logger.error('Missing env: MONGO_URL');
    process.exit(1);
  }

  return { mongoUrl };
});
