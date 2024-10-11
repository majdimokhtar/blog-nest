import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepositoryInterface } from './blog-post.repository.interface';

@Injectable()
export class TypeOrmBlogPostRepository implements BlogPostRepositoryInterface {
  constructor(
    @InjectRepository(BlogPost)
    private readonly repository: Repository<BlogPost>,
  ) {}

  async save(blogPost: BlogPost): Promise<void> {
    await this.repository.save(blogPost);
  }

  async findById(id: string): Promise<BlogPost | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<BlogPost[]> {
    return await this.repository.find();
  }
}
