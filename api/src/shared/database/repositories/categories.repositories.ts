import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createDto: Prisma.CategoryCreateArgs) {
        return this.prismaService.category.create(createDto);
    }

    findMany(findManyDto: Prisma.CategoryFindManyArgs) {
        return this.prismaService.category.findMany(findManyDto);
    }

    update(updateDto: Prisma.CategoryUpdateArgs) {
        return this.prismaService.category.update(updateDto);
    }

    findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
        return this.prismaService.category.findFirst(findFirstDto);
    }

    delete(deleteDto: Prisma.CategoryDeleteArgs) {
        return this.prismaService.category.delete(deleteDto);
    }
}
