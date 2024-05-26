import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findOne({ email: loginDto.email });
        if (user && this.matchPassword(loginDto.password, user.password)) {
            const payload = user
            const accessToken = await this.jwtService.signAsync(payload)
            return {
                accessToken,
                user
            };
        }
        throw new BadRequestException('Incorrect username or password')
    }

    async signup(signupDto: SignupDto) {
        try {
            const user = await this.usersService.create(signupDto);
            return {
                user,
                message: 'User created successfully'
            }
        } catch (exceptions) {
            throw new BadRequestException('Unexpected error occoured')
        }
    }


    matchPassword(password: string, hashPassword: string) {
        return bcrypt.compareSync(password, hashPassword);
    }


    async verifyToken(request: Request) {
        try {
            const tokenUser = request['user'];
            if (!tokenUser) {
                throw new UnauthorizedException();
            }
            const user = await this.usersService.findOne({ email: tokenUser.email });
            if (!user) {
                throw new UnauthorizedException();
            }
            return {
                user,
                message: "User is valid"
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
    }


}
