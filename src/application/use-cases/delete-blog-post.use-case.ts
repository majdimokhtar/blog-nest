// import { BlogPostRepositoryInterface } from '../../infrastructure/repositories/blog-post.repository.interface';

// export class DeleteBlogPostUseCase {
//   constructor(
//     private readonly blogPostRepository: BlogPostRepositoryInterface,
//   ) {}

//   async execute(id: string): Promise<void> {
//     const blogPost = await this.blogPostRepository.findById(id);
//     if (!blogPost) {
//       throw new Error('Blog post not found');
//     }
//     await this.blogPostRepository.delete(id);
//   }
// }

import { NotFoundException } from '@nestjs/common';
import { BlogPostRepositoryInterface } from '../../infrastructure/repositories/blog-post.repository.interface';

export class DeleteBlogPostUseCase {
  constructor(
    private readonly blogPostRepository: BlogPostRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const blogPost = await this.blogPostRepository.findById(id);
    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }
    await this.blogPostRepository.delete(id);
  }
}
