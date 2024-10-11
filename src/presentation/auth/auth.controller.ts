import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { AuthService } from 'src/application/auth/auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    await this.authService.register(registerUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return await this.authService.login(user);
  }
}
