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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Get()
    findAll() {
        return this.customersService.findAll();
    }

    @Get()
    findById(@Param('customerId', ParseUUIDPipe) customerId: string) {
        return this.customersService.findById(customerId);
    }

    @Put(':customerId')
    update(
        @Param('customerId', ParseUUIDPipe) customerId: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return this.customersService.update(customerId, updateCustomerDto);
    }

    @Delete(':customerId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('customerId', ParseUUIDPipe) customerId: string) {
        return this.customersService.remove(customerId);
    }
}
