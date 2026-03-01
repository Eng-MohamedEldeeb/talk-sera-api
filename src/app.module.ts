import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
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
    ConfigModule.forRoot({ envFilePath: resolve('./.env'), isGlobal: true }),
    MongooseModule.forRoot(DB_URI as string, {
      onConnectionCreate() {
        console.log(
          `${chalk.yellow('DB')} Connected ${chalk.green('Successfully')}`,
        );
      },
    }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
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
