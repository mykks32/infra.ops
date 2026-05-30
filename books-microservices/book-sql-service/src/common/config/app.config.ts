import { registerAs } from '@nestjs/config'
import { Logger } from '@nestjs/common'

const logger = new Logger('AppConfig')

export const AppConfig = registerAs('app', () => {
  const port = process.env.PORT
  const nodeEnv = process.env.NODE_ENV

  if (!nodeEnv) {
    logger.warn('NODE_ENV is not set, defaulting to "development"')
  }

  return {
    port: port ? Number(port) : 3000,
    nodeEnv: nodeEnv ?? 'development',
    isDevelopment: (nodeEnv ?? 'development') === 'development',
    isProduction: nodeEnv === 'production',
  }
})
