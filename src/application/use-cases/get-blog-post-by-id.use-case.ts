// import { BlogPost } from '../../domain/blog-post.entity';

// export class GetBlogPostByIdUseCase {
//   constructor(private readonly blogPosts: BlogPost[]) {}

//   execute(id: string): BlogPost | undefined {
//     return this.blogPosts.find((post) => post.id === id);
//   }
// }

import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from '../../infrastructure/repositories/blog-post.repository.interface';

export class GetBlogPostByIdUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  async execute(id: string): Promise<BlogPost | undefined> {
    return await this.blogPostRepository.findById(id);
  }
}
