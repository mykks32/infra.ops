import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './book.dto'
import { BookSerializer } from './book.serializer'
import { response } from '../common/utils/reponse'
import { Book } from './book.entity'

@Controller('books')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateBookDto): Promise<BookSerializer> {
    const book: Book = await this.service.create(body)
    return response(BookSerializer, book)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<BookSerializer[]> {
    const books: Book[] = await this.service.findAll()
    return books.map((book) => response(BookSerializer, book))
  }
}
