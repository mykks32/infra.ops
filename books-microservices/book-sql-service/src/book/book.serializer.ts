import { Expose } from 'class-transformer'

export class BookSerializer {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  author: string
}
