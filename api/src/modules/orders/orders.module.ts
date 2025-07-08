import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RabbitmqModule } from 'src/shared/services/rabbitmq.module';
import { UsersService } from '../users/users.service';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, UsersService],
    imports: [RabbitmqModule],
})
export class OrdersModule {}
