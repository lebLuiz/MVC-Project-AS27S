import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
    @IsString({ message: 'O nome precisa ser uma string' })
    @IsNotEmpty({ message: 'O nome não pode estar vázia' })
    name: string;

    @IsString({ message: 'O email precisa ser uma string' })
    @IsNotEmpty({ message: 'O email não pode estar vázia' })
    @IsEmail()
    email: string;

    @IsString({ message: 'A senha precisa ser uma string' })
    @IsNotEmpty({ message: 'A senha não pode estar vázia' })
    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
    password: string;
}
