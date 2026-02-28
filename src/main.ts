import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/env';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`App is running on Port ${chalk.yellow(PORT)}`),
  );
}
bootstrap();
