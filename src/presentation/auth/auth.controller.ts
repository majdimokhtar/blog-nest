import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { AuthService } from '../../application/auth/auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    try {
      await this.authService.register(registerUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Error registering user');
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.authService.validateUser(
        loginUserDto.username,
        loginUserDto.password,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return await this.authService.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error logging in');
    }
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.authService.getAllUsers();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving users');
    }
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.authService.getUserById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving user');
    }
  }
}
