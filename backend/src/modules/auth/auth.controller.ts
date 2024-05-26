import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }


  @Post('register')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto)
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  verifyToken(@Req() request: Request) {
    return this.authService.verifyToken(request);
  }
}
