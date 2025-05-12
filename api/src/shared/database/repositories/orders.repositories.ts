import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class OrdersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createDto: Prisma.OrderCreateArgs) {
        return this.prismaService.order.create(createDto);
    }

    findMany(findManyDto: Prisma.OrderFindManyArgs) {
        return this.prismaService.order.findMany(findManyDto);
    }

    update(updateDto: Prisma.OrderUpdateArgs) {
        return this.prismaService.order.update(updateDto);
    }

    findFirst(findFirstDto: Prisma.OrderFindFirstArgs) {
        return this.prismaService.order.findFirst(findFirstDto);
    }

    delete(deleteDto: Prisma.OrderDeleteArgs) {
        return this.prismaService.order.delete(deleteDto);
    }
}
