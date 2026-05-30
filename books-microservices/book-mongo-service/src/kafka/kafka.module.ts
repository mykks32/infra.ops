import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppConfigService } from '../config/config.service';
import { KafkaService } from './kafka.service';
import { AppConfigModule } from '../config/config.module';
import { KAFKA_CLIENT } from './kafka.constant';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (cfg: AppConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: cfg.kafkaClientId,
              brokers: [cfg.kafkaBroker],
            },
            consumer: {
              groupId: cfg.kafkaGroupId,
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
