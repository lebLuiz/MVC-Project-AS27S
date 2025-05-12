import {
    IsArray,
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    customerId: string;

    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsDecimal()
    @IsNotEmpty()
    total: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];
}
