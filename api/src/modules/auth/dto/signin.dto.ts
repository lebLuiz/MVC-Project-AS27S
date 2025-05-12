import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
    @IsString({ message: 'O email precisa ser uma string' })
    @IsNotEmpty({ message: 'O email não pode estar vázia' })
    @IsEmail(undefined, { message: 'O email precisa ser um e-mail' })
    email: string;

    @IsString({ message: 'A senha precisa ser uma string' })
    @IsNotEmpty({ message: 'A senha não pode estar vázia' })
    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
    password: string;
}
