import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BookAnalyticsService } from './book-analytics.service';
import { RedisRepository } from '../redis/redis.repository';
import { BookCreatedEventDto, BookEventDto } from './book-analytics.dto';
import { KafkaTopic } from '../kafka/kafka.constant';

@Controller()
export class BookAnalyticsConsumer {
  private readonly logger = new Logger(BookAnalyticsConsumer.name);

  constructor(
    private readonly bookAnalyticsService: BookAnalyticsService,
    private readonly redisRepo: RedisRepository,
  ) {}

  @EventPattern(KafkaTopic.book_created)
  async handleBookCreated(@Payload() data: BookCreatedEventDto): Promise<void> {
    this.logger.log(`[book_created] bookId=${data.id}`);
    await this.bookAnalyticsService.createFromEvent(data);
    await this.redisRepo.set(`book:${data.id}`, JSON.stringify(data));
  }

  @EventPattern(KafkaTopic.book_viewed)
  async handleBookViewed(@Payload() data: BookEventDto): Promise<void> {
    await this.bookAnalyticsService.incrementViews(data.id);
  }

  @EventPattern(KafkaTopic.book_liked)
  async handleBookLiked(@Payload() data: BookEventDto): Promise<void> {
    await this.bookAnalyticsService.incrementLikes(data.id);
  }

  @EventPattern(KafkaTopic.book_unliked)
  async handleBookUnliked(@Payload() data: BookEventDto): Promise<void> {
    await this.bookAnalyticsService.decrementLikes(data.id);
  }

  @EventPattern(KafkaTopic.book_deleted)
  async handleBookDeleted(@Payload() data: BookEventDto): Promise<void> {
    this.logger.log(`[book_deleted] bookId=${data.id}`);
    await this.bookAnalyticsService.deleteByBookId(data.id);
    await this.redisRepo.del(`book:${data.id}`);
  }
}
