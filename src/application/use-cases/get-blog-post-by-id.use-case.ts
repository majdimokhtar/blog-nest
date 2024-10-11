import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from '../../infrastructure/repositories/blog-post.repository.interface';

export class GetBlogPostByIdUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  async execute(id: string): Promise<BlogPost | undefined> {
    return await this.blogPostRepository.findById(id);
  }
}
