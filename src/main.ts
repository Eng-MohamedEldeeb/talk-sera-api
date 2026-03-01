import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk from 'chalk';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { PORT } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(PORT, () =>
    console.log(`App is running on Port ${chalk.yellow(PORT)}`),
  );
}
bootstrap();
