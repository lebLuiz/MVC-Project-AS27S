import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from 'src/shared/database/repositories/products.repositories';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepo: ProductsRepository) {}

    create(createProductDto: CreateProductDto) {
        return this.productsRepo.create({
            data: createProductDto,
            select: null,
        });
    }

    findAll() {
        return this.productsRepo.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock: true,
                category: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findById(productId: string) {
        const product = await this.productsRepo.findFirst({
            where: {
                id: productId,
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!product) throw new NotFoundException('Produto não encontrada.');
        return product;
    }

    async update(productId: string, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepo.findFirst({
            where: { id: productId },
        });
        if (!product) throw new NotFoundException('Produto não encontrado.');

        return this.productsRepo.update({
            data: {
                name: updateProductDto.name,
                description: updateProductDto.description,
                price: updateProductDto.price,
                stock: updateProductDto.stock,
                categoryId: updateProductDto.categoryId,
            },
            where: {
                id: productId,
            },
        });
    }

    remove(productId: string) {
        return this.productsRepo.delete({
            where: {
                id: productId,
            },
        });
    }
}
