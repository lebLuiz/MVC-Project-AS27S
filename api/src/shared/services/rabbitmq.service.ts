import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqplib from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    private connection: amqplib.ChannelModel;
    private channel: amqplib.Channel;
    private readonly queue = 'send_email_queue';

    async onModuleInit() {
        this.connection = await amqplib.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.queue, { durable: true });
    }

    async onModuleDestroy() {
        await this.channel?.close();
        await this.connection?.close();
    }

    publish(message: any) {
        this.channel.sendToQueue(
            this.queue,
            Buffer.from(JSON.stringify(message)),
            {
                persistent: true,
            },
        );
    }
}
