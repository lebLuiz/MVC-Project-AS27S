import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    quantity: number;
}
