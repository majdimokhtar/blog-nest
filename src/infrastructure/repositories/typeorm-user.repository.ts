import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';

@Injectable()
export class TypeOrmUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async save(user: User): Promise<void> {
    try {
      await this.repository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error saving user');
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.repository.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException('Error finding user by username');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error finding all users');
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return await this.repository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Error finding user by ID');
    }
  }
}
