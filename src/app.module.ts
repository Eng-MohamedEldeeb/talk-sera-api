import { resolve } from 'path';
import { log } from 'console';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import chalk from 'chalk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  // AiChatModule,
  AttemptModule,
  AuthModule,
  BadgeModule,
  FlashCardModule,
  LessonModule,
  ProgressModule,
  QuestionModule,
  QuizModule,
  SubscriptionModule,
  UserModule,
  WordModule,
} from './modules';
import { DB_URI } from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: resolve('./.env') }),
    MongooseModule.forRoot(DB_URI as string, {
      connectionFactory: () => {
        log(`${chalk.yellow('DB')} Connected ${chalk.green('Successfully')}`);
      },
    }),
    AuthModule,
    UserModule,
    WordModule,
    FlashCardModule,
    QuestionModule,
    QuizModule,
    LessonModule,
    ProgressModule,
    AttemptModule,
    // AiChatModule,
    BadgeModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
