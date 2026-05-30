import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { HttpClassValidatorPipe } from './common/pipes/http-class-validator.pipe';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger('Bootstrap');

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const cfg = app.get(AppConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: cfg.kafkaClientId,
        brokers: [cfg.kafkaBroker],
      },
      consumer: {
        groupId: cfg.kafkaGroupId,
      },
    },
  });

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new HttpClassValidatorPipe());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(cfg.port);

  logger.log(`[${cfg.nodeEnv}] listening on port ${cfg.port}`);

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, () => {
      void (async () => {
        logger.warn(`Received ${signal}, shutting down gracefully...`);

        try {
          await app.close();
          logger.log('App shutdown complete');
        } catch (err) {
          logger.error('Error during shutdown', err);
        } finally {
          process.exit(0);
        }
      })();
    });
  });
}

void bootstrap();
