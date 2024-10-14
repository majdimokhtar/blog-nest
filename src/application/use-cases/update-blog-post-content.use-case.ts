import { NotFoundException } from '@nestjs/common';
import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from '../../infrastructure/blog-post.repository';

export class UpdateBlogPostContentUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  async execute(id: string, newContent: string): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findById(id);

    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    blogPost.updateContent(newContent);
    await this.blogPostRepository.save(blogPost);

    return blogPost;
  }
}
