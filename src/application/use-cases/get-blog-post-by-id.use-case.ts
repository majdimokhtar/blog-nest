import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepositoryInterface } from '../../infrastructure/repositories/blog-post.repository.interface';

export class GetBlogPostByIdUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepositoryInterface) {}

  async execute(id: string): Promise<BlogPost | undefined> {
    return await this.blogPostRepository.findById(id);
  }
}
