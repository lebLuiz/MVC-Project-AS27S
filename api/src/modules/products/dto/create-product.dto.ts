import {
    IsDecimal,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateProductDto {
    @IsString({ message: 'O nome precisa ser uma string' })
    @IsNotEmpty({ message: 'O nome não pode estar vázio' })
    name: string;

    @IsOptional()
    @IsString({ message: 'A descrição precisa ser uma string' })
    description: string;

    @IsNotEmpty({ message: 'O preço não pode estar vázio' })
    @IsDecimal(
        { locale: 'pt-BR' },
        { message: 'O preço deve ser um número decimal' },
    )
    price: string;

    @IsInt({ message: 'O número de estoque precisa ser númerico' })
    @IsNotEmpty({ message: 'O número de estoque não pode estar vázio' })
    stock: number;

    @IsString({
        message: 'O Identificador da Categoria precisa ser uma string',
    })
    @IsNotEmpty({
        message: 'O Identificador da Categoria não pode estar vázio',
    })
    @IsUUID()
    categoryId: string;
}
