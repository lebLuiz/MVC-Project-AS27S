import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { CategoriesModule } from './modules/categories/categories.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        UsersModule,
        ProductsModule,
        CustomersModule,
        OrdersModule,
        CategoriesModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
