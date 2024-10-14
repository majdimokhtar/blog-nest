import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepositoryInterface } from '../../infrastructure/repositories/blog-post.repository.interface';

export class GetAllBlogPostsUseCase {
  constructor(
    private readonly blogPostRepository: BlogPostRepositoryInterface,
  ) {}

  async execute(): Promise<BlogPost[]> {
    return await this.blogPostRepository.findAll();
  }
}
