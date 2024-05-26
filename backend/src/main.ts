import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { formatValidationError } from './utils/exception-formatter';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const errorMessages = formatValidationError(errors);
      return new BadRequestException(errorMessages);
    }
  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
