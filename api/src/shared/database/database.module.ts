import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { ProductsRepository } from './repositories/products.repositories';
import { OrdersRepository } from './repositories/orders.repositories';
import { CustomersRepository } from './repositories/customers.repositories';

// NOTE: Provider`s por padrão são privados, preciso informar no `exports` o que está sendo exportado para outros módulos poderem utilizar.

// NOTE: @Global() fica automaticamente visivel para todos os módulos da aplicação.
@Global()
@Module({
    providers: [
        PrismaService,
        UsersRepository,
        CategoriesRepository,
        ProductsRepository,
        OrdersRepository,
        CustomersRepository,
    ],
    exports: [
        UsersRepository,
        CategoriesRepository,
        ProductsRepository,
        OrdersRepository,
        CustomersRepository,
    ],
})
export class DatabaseModule {}
