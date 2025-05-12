import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
    @IsString({ message: 'O nome precisa ser uma string' })
    @IsNotEmpty({ message: 'O nome não pode estar vázio' })
    name: string;

    @IsString({ message: 'O email precisa ser uma string' })
    @IsNotEmpty({ message: 'O email não pode estar vázio' })
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString({ message: 'O email precisa ser uma string' })
    phone: string;
}
