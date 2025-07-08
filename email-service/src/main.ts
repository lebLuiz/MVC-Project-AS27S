import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EmailModule } from './email/email.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        EmailModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                noAck: false,
                queueOptions: {
                    durable: false,
                },
            },
        },
    );

    await app.listen();
    console.log('📨 Email Microservice is listening...');
}
bootstrap();
