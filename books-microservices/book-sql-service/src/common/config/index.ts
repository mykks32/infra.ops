import { PostgresConfig } from './postgres.config'
import { KafkaConfig } from './kafka.config'
import { AppConfig } from './app.config'

export const Config = [AppConfig, PostgresConfig, KafkaConfig]
