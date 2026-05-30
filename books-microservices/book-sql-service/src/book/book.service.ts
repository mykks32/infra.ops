import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Book } from './book.entity'
import { CreateBookDto } from './book.dto'
import { KafkaTopic } from '../kafka/kafka.constant'
import { GlobalHttpException } from '../common/exceptions/http.exception'
import { KafkaService } from '../kafka/kafka.service'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const existing = await this.repo.findOne({
      where: { title: dto.title, author: dto.author },
    })

    if (existing) {
      throw new GlobalHttpException('bookAlreadyExists', HttpStatus.CONFLICT)
    }

    const book: Book = await this.repo.save(dto)

    this.kafkaService.emit(KafkaTopic.book_created, {
      id: book.id,
      title: book.title,
      author: book.author,
    })

    return book
  }

  async findAll(): Promise<Book[]> {
    const books = await this.repo.find()

    if (!books.length) {
      throw new GlobalHttpException('bookNotFound', HttpStatus.NOT_FOUND)
    }

    return books
  }
}
