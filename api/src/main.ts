/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors = require('cors');
  const corsOptions = {
    credentials: true,
  };

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cors(corsOptions));

  await app.listen(3030);
}
bootstrap();
