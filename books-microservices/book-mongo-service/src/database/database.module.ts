import { Module } from '@nestjs/common';
import { MongooseConfig } from './mongoose.config';

@Module({
  imports: [MongooseConfig],
})
export class DatabaseModule {}
