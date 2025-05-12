import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: 'http://localhost:3000', // NOTE: Ou substitua por seu domínio real do projeto Front-End (app)
        credentials: true,
    });

    await app.listen(3003);
}
bootstrap();
