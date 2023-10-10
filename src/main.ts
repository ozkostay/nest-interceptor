import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from "./app.logging.interceptor.v1";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Interceptor - Задание 1
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
