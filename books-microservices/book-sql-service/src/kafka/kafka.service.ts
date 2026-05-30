import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { KAFKA_CLIENT } from './kafka.constant'

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CLIENT)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect()
  }

  emit<T extends object>(topic: string, payload: T): void {
    this.kafkaClient.emit(topic, payload)
  }
}
