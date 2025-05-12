import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createDto: Prisma.ProductCreateArgs) {
        return this.prismaService.product.create(createDto);
    }

    findMany(findManyDto: Prisma.ProductFindManyArgs) {
        return this.prismaService.product.findMany(findManyDto);
    }

    update(updateDto: Prisma.ProductUpdateArgs) {
        return this.prismaService.product.update(updateDto);
    }

    findFirst(findFirstDto: Prisma.ProductFindFirstArgs) {
        return this.prismaService.product.findFirst(findFirstDto);
    }

    delete(deleteDto: Prisma.ProductDeleteArgs) {
        return this.prismaService.product.delete(deleteDto);
    }
}
