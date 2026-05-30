import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';

export const MongooseConfig = MongooseModule.forRootAsync({
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: (config: AppConfigService) => ({
    uri: config.mongoUrl,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 60000,
    serverSelectionTimeoutMS: 50000,
    maxIdleTimeMS: 60000,
    heartbeatFrequencyMS: 10000,
    monitorCommands: true,
  }),
});
