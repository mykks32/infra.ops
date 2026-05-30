import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppConfigModule } from './config/config.module';
import { BookAnalyticsModule } from './book-analytics/book-analytics.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, BookAnalyticsModule, KafkaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
