import { Injectable } from '@nestjs/common';
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
    await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { username } });
  }
}
