import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntentsController } from './modules/intents/intents.controller';
import { IntentsService } from './modules/providers/intents.service';
import { CredentialsService } from './modules/providers/credentials.service';
import { CredentialProvider } from './modules/config/credentials.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
  ],
  controllers: [IntentsController],
  providers: [IntentsService, CredentialsService, CredentialProvider],
})
export class AppModule {}
