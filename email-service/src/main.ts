import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EmailModule } from './email/email.module';

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        EmailModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [RABBITMQ_URL],
                queue: process.env.QUEUE_NAME,
                queueOptions: {
                    durable: true,
                },
            },
        },
    );

    await app.listen();
    console.log('📨 Email Microservice is listening...');
}
bootstrap();
