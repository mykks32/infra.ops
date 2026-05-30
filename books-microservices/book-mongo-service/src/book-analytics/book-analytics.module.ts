import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookAnalyticsService } from './book-analytics.service';
import { BookAnalyticsConsumer } from './book-analytics.consumer';
import {
  BookAnalyticsEntity,
  BookAnalyticsSchema,
} from './book-analytics.entity';
import { RedisModule } from '../redis/redis.module'; // adjust path if needed

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookAnalyticsEntity.name, schema: BookAnalyticsSchema },
    ]),
    RedisModule,
  ],
  controllers: [BookAnalyticsConsumer],
  providers: [BookAnalyticsService],
  exports: [BookAnalyticsService],
})
export class BookAnalyticsModule {}
