import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString({ message: 'O nome precisa ser uma string' })
    @IsNotEmpty({ message: 'O nome não pode estar vázio' })
    name: string;

    @IsString({ message: 'A descrição precisa ser uma string' })
    description: string;
}
