import { registerAs } from '@nestjs/config'
import { Logger } from '@nestjs/common'

const logger = new Logger('PostgresConfig')

export const PostgresConfig = registerAs('postgres', () => {
  const postgresUrl = process.env.POSTGRES_URL

  if (!postgresUrl) {
    logger.error('Missing env: POSTGRES_URL')
    process.exit(1)
  }

  return { postgresUrl }
})
