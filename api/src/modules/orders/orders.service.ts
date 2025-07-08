import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repositories';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RabbitmqService } from 'src/shared/services/rabbitmq.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepo: OrdersRepository,
        private readonly usersService: UsersService,
        private readonly rabbitmqService: RabbitmqService,
    ) {}

    create(createOrderDto: CreateOrderDto) {
        const { orderItems, ...orderData } = createOrderDto;
        return this.ordersRepo.create({
            data: {
                ...orderData,
                orderItems: {
                    create: orderItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            select: null,
        });
    }

    findAll() {
        return this.ordersRepo.findMany({
            select: {
                id: true,
                total: true,
                customer: {
                    select: {
                        name: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                orderItems: {
                    select: {
                        id: true,
                        productId: true,
                        quantity: true,
                        product: { select: { name: true, price: true } },
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findById(orderId: string) {
        const order = await this.ordersRepo.findFirst({
            where: {
                id: orderId,
            },
            select: {
                id: true,
                customer: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                total: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!order) throw new NotFoundException('Cliente não encontrada.');
        return order;
    }

    async update(orderId: string, updateOrderDto: UpdateOrderDto) {
        const order = await this.ordersRepo.findFirst({
            where: { id: orderId },
        });
        if (!order) throw new NotFoundException('Cliente não encontrado.');

        return this.ordersRepo.update({
            data: {
                customerId: updateOrderDto.customerId,
                userId: updateOrderDto.userId,
                total: updateOrderDto.total,
            },
            where: {
                id: orderId,
            },
        });
    }

    remove(orderId: string) {
        return this.ordersRepo.delete({
            where: {
                id: orderId,
            },
        });
    }

    async finalizeOrder(orderId: string, userId: string) {
        const user = await this.usersService.getUserById(userId);
        if (!user)
            throw new NotFoundException('Usuário associado não encontrado.');

        const emailPayload = {
            to: user.email,
            subject: 'Pedido finalizado!',
            body: `Olá, seu pedido ${orderId} foi finalizado com sucesso!`,
        };

        this.rabbitmqService.sendEmail(emailPayload);

        return {
            message: `Pedido finalizado (simulado) e informações enviadas para o e-mail: ${user.email}!`,
        };
    }
}
