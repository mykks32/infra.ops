import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BookAnalyticsEntity,
  BookAnalyticsDocument,
} from './book-analytics.entity';

@Injectable()
export class BookAnalyticsService {
  constructor(
    // Must match the name used in MongooseModule.forFeature — BookAnalyticsEntity.name
    @InjectModel(BookAnalyticsEntity.name)
    private readonly model: Model<BookAnalyticsDocument>,
  ) {}

  async createFromEvent(data: { id: string }): Promise<BookAnalyticsDocument> {
    return this.model.create({
      bookId: data.id,
      views: 0,
      likes: 0,
    });
  }

  async findAll(): Promise<BookAnalyticsDocument[]> {
    return this.model.find().exec();
  }

  async findOne(bookId: string): Promise<BookAnalyticsDocument> {
    const doc = await this.model.findOne({ bookId }).exec();
    if (!doc)
      throw new NotFoundException(
        `BookAnalytics for bookId "${bookId}" not found`,
      );
    return doc;
  }

  async incrementViews(bookId: string): Promise<void> {
    await this.model.updateOne({ bookId }, { $inc: { views: 1 } }).exec();
  }

  async decrementViews(bookId: string): Promise<void> {
    await this.model
      .updateOne({ bookId, views: { $gt: 0 } }, { $inc: { views: -1 } })
      .exec();
  }

  async incrementLikes(bookId: string): Promise<void> {
    await this.model.updateOne({ bookId }, { $inc: { likes: 1 } }).exec();
  }

  async decrementLikes(bookId: string): Promise<void> {
    await this.model
      .updateOne({ bookId, likes: { $gt: 0 } }, { $inc: { likes: -1 } })
      .exec();
  }

  async deleteByBookId(bookId: string): Promise<void> {
    await this.model.deleteOne({ bookId }).exec();
  }
}
