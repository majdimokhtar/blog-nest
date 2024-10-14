import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';
import { User } from '../../domain/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/presentation/dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: TypeOrmUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);

      const user = new User();
      user.username = registerUserDto.username;
      user.password = hashedPassword;

      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (user && (await user.validatePassword(password))) {
        return user;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving users');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);
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
