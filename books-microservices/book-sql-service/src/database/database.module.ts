import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppConfigService } from '../config/config.service'
import { typeOrmConfig } from './typeorm.config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (cfg: AppConfigService) => ({
        ...typeOrmConfig,
        url: cfg.postgresUrl,
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class DatabaseModule {}
