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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get()
    findById(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
        return this.categoriesService.findById(categoryId);
    }

    @Put(':categoryId')
    update(
        @Param('categoryId', ParseUUIDPipe) categoryId: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(categoryId, updateCategoryDto);
    }

    @Delete(':categoryId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
        return this.categoriesService.remove(categoryId);
    }
}
