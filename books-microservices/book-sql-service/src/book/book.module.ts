import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { Book } from './book.entity'
import { KafkaModule } from '../kafka/kafka.module'

@Module({
  imports: [TypeOrmModule.forFeature([Book]), KafkaModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
