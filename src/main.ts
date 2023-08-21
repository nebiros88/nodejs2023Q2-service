import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './utils/custom-exception-filter';
import { CustomLoggerService } from './logger/logger.service';
import { LogLevels } from './constants';
import { writeToFile } from './utils';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(new CustomLoggerService());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(PORT);

  process.on('uncaughtException', (err) => {
    console.log(err);
    writeToFile(
      LogLevels[LogLevels.error] as keyof typeof LogLevels,
      err.message,
    );
  });

  process.on('unhandledRejection', (err) => {
    console.log(err);
    writeToFile(
      LogLevels[LogLevels.error] as keyof typeof LogLevels,
      `unhandledRejection: ${err}`,
    );
  });
}
bootstrap();
