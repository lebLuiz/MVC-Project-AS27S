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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get()
    findById(@Param('productId', ParseUUIDPipe) productId: string) {
        return this.productsService.findById(productId);
    }

    @Put(':productId')
    update(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(productId, updateProductDto);
    }

    @Delete(':productId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('productId', ParseUUIDPipe) productId: string) {
        return this.productsService.remove(productId);
    }
}
