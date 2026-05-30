import { registerAs } from '@nestjs/config'
import { Logger } from '@nestjs/common'

const logger = new Logger('KafkaConfig')

export const KafkaConfig = registerAs('kafka', () => {
  const kafkaBroker = process.env.KAFKA_BROKER
  const clientId = process.env.KAFKA_CLIENT_ID
  const groupId = process.env.KAFKA_GROUP_ID

  if (!kafkaBroker) {
    logger.error('Missing env: KAFKA_BROKER')
    process.exit(1)
  }
  if (!clientId) {
    logger.error('Missing env: KAFKA_CLIENT_ID')
    process.exit(1)
  }
  if (!groupId) {
    logger.error('Missing env: KAFKA_GROUP_ID')
    process.exit(1)
  }

  return { kafkaBroker, clientId, groupId }
})
