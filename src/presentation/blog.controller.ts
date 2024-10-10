import { Controller, Post, Body } from '@nestjs/common';
import { CreateBlogPostUseCase } from '../application/create-blog-post.use-case';
import { BlogPostRepository } from '../infrastructure/blog-post.repository';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly createBlogPostUseCase: CreateBlogPostUseCase,
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  @Post()
  create(
    @Body() createBlogDto: { title: string; content: string; authorId: string },
  ) {
    const blogPost = this.createBlogPostUseCase.execute(
      createBlogDto.title,
      createBlogDto.content,
      createBlogDto.authorId,
    );
    this.blogPostRepository.save(blogPost);
    return blogPost;
  }
}
