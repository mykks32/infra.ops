import { DataSourceOptions } from 'typeorm'
import { Book } from '../book/book.entity'
import * as path from 'node:path'

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [Book],
  migrations: [path.join(__dirname, 'migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
}
