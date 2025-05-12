import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class CustomersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createDto: Prisma.CustomerCreateArgs) {
        return this.prismaService.customer.create(createDto);
    }

    findMany(findManyDto: Prisma.CustomerFindManyArgs) {
        return this.prismaService.customer.findMany(findManyDto);
    }

    update(updateDto: Prisma.CustomerUpdateArgs) {
        return this.prismaService.customer.update(updateDto);
    }

    findFirst(findFirstDto: Prisma.CustomerFindFirstArgs) {
        return this.prismaService.customer.findFirst(findFirstDto);
    }

    delete(deleteDto: Prisma.CustomerDeleteArgs) {
        return this.prismaService.customer.delete(deleteDto);
    }
}
