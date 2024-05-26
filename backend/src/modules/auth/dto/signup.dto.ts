import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "src/common/validation/is-unique.decorator";
import { IsCustomStrongPassword } from "src/common/validation/password-validation";
import { User } from "src/modules/users/schemas/user.schema";


export class SignupDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    @MinLength(3)
    name: string;

    @IsEmail({}, {
        message: "Email must be a valid email"
    })
    @IsNotEmpty()
    @MaxLength(120)
    @MinLength(3)
    @IsUnique('email', {
        message: 'Email already exists',
    })
    email: string;

    @IsCustomStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string;

}