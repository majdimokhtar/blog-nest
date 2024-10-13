import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);

    const user = new User();
    user.username = registerUserDto.username;
    user.password = hashedPassword;

    await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  // New method to get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll(); // Assuming this method exists in your repository
  }

  // New method to get a user by ID
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id); // Assuming this method exists in your repository
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
