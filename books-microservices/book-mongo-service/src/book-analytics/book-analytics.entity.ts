import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: BookAnalyticsEntity.collection })
export class BookAnalyticsEntity {
  static readonly collection = 'book_analytics';

  _id: Types.ObjectId;

  // reference from Postgres service
  @Prop({ type: String, required: true, unique: true })
  bookId: string;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: Number, default: 0 })
  likes: number;

  createdAt: Date;
  updatedAt: Date;
}

export type BookAnalyticsDocument = BookAnalyticsEntity & Document;
export const BookAnalyticsSchema =
  SchemaFactory.createForClass(BookAnalyticsEntity);
