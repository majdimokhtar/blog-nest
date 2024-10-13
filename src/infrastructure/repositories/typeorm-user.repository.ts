import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { find } from 'rxjs';

@Injectable()
export class TypeOrmUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { username } });
  }

  // New method to find all users
  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  // New method to find user by ID
  async findById(id: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { id } });
  }
}
