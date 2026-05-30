import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { BookModule } from './book/book.module'
import { DatabaseModule } from './database/database.module'
import { RequestIdMiddleware } from './common/middleware/request-id.middleware'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { AppConfigModule } from './config/config.module'

@Module({
  imports: [AppConfigModule, DatabaseModule, BookModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, LoggerMiddleware).forRoutes('*')
  }
}
