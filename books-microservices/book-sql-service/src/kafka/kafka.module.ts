import { Module, Inject, OnApplicationBootstrap } from '@nestjs/common'
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const KAFKA_CLIENT = 'KAFKA_CLIENT'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: config.getOrThrow<string>('kafka.clientId'),
              brokers: [config.getOrThrow<string>('kafka.kafkaBroker')],
            },
            consumer: {
              groupId: config.getOrThrow<string>('kafka.groupId'),
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule implements OnApplicationBootstrap {
  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka,
  ) {}

  async onApplicationBootstrap() {
    await this.kafkaClient.connect()
  }
}
