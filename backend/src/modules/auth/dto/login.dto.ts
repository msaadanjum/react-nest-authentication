import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class LoginDto {

    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}