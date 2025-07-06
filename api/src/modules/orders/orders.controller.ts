import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get()
    findById(@Param('orderId', ParseUUIDPipe) orderId: string) {
        return this.ordersService.findById(orderId);
    }

    @Put(':orderId')
    update(
        @Param('orderId', ParseUUIDPipe) orderId: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {
        return this.ordersService.update(orderId, updateOrderDto);
    }

    @Delete(':orderId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('orderId', ParseUUIDPipe) orderId: string) {
        return this.ordersService.remove(orderId);
    }

    @Post(':orderId/finalize')
    finalizeOrder(
        @Param('orderId', ParseUUIDPipe) orderId: string,
        @ActiveUserId() userId: string,
    ) {
        return this.ordersService.finalizeOrder(orderId, userId);
    }
}
