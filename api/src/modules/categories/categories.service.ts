import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepo: CategoriesRepository) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.categoriesRepo.create({
            data: createCategoryDto,
            select: null,
        });
    }

    findAll() {
        return this.categoriesRepo.findMany({
            select: {
                id: true,
                name: true,
                description: true,
            },
        });
    }

    async findById(categoryId: string) {
        const category = await this.categoriesRepo.findFirst({
            where: {
                id: categoryId,
            },
            select: {
                id: true,
                name: true,
                description: true,
            },
        });

        if (!category) throw new NotFoundException('Categoria não encontrada.');
        return category;
    }

    async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoriesRepo.findFirst({
            where: { id: categoryId },
        });
        if (!category) throw new NotFoundException('Categoria não encontrada.');

        return this.categoriesRepo.update({
            data: {
                name: updateCategoryDto.name,
                description: updateCategoryDto?.description || '',
            },
            where: {
                id: categoryId,
            },
        });
    }

    remove(categoryId: string) {
        return this.categoriesRepo.delete({
            where: {
                id: categoryId,
            },
        });
    }
}
