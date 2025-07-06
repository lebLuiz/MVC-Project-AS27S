import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RabbitMQService } from '../../shared/services/rabbitmq.service';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, RabbitMQService],
})
export class OrdersModule {}
