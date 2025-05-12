import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomersRepository } from 'src/shared/database/repositories/customers.repositories';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
    constructor(private readonly customersRepo: CustomersRepository) {}

    create(createCustomerDto: CreateCustomerDto) {
        return this.customersRepo.create({
            data: createCustomerDto,
            select: null,
        });
    }

    findAll() {
        return this.customersRepo.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            },
        });
    }

    async findById(customerId: string) {
        const customer = await this.customersRepo.findFirst({
            where: {
                id: customerId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            },
        });

        if (!customer) throw new NotFoundException('Cliente não encontrada.');
        return customer;
    }

    async update(customerId: string, updateCustomerDto: UpdateCustomerDto) {
        const customer = await this.customersRepo.findFirst({
            where: { id: customerId },
        });
        if (!customer) throw new NotFoundException('Cliente não encontrado.');

        return this.customersRepo.update({
            data: {
                name: updateCustomerDto.name,
                email: updateCustomerDto.email,
                phone: updateCustomerDto.phone,
            },
            where: {
                id: customerId,
            },
        });
    }

    remove(customerId: string) {
        return this.customersRepo.delete({
            where: {
                id: customerId,
            },
        });
    }
}
