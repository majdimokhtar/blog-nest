// import { Controller, Post, Get, Param, Body } from '@nestjs/common';
// import { CreateBlogPostUseCase } from '../../application/use-cases/create-blog-post.use-case';
// import { GetBlogPostByIdUseCase } from '../../application/use-cases/get-blog-post-by-id.use-case';
// import { InMemoryBlogPostRepository } from '../../infrastructure/repositories/in-memory-blog-post.repository';
// import { CreateBlogPostDto } from '../dto/create-blog-post.dto';

// @Controller('blog')
// export class BlogController {
//   private readonly blogPostRepository = new InMemoryBlogPostRepository();
//   private readonly createBlogPostUseCase = new CreateBlogPostUseCase(
//     this.blogPostRepository,
//   );
//   private readonly getBlogPostByIdUseCase = new GetBlogPostByIdUseCase(
//     this.blogPostRepository,
//   );

//   @Post()
//   create(@Body() createBlogDto: CreateBlogPostDto) {
//     const blogPost = this.createBlogPostUseCase.execute(
//       createBlogDto.title,
//       createBlogDto.content,
//       createBlogDto.authorId,
//     );
//     return blogPost;
//   }

//   @Get(':id')
//   getById(@Param('id') id: string) {
//     const blogPost = this.getBlogPostByIdUseCase.execute(id);
//     if (!blogPost) {
//       return { message: 'Blog post not found' };
//     }
//     return blogPost;
//   }
// }

import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogPostUseCase } from '../../application/use-cases/create-blog-post.use-case';
import { GetBlogPostByIdUseCase } from '../../application/use-cases/get-blog-post-by-id.use-case';
import { TypeOrmBlogPostRepository } from '../../infrastructure/repositories/typeorm-blog-post.repository';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';


@Controller('blog')
export class BlogController {
  constructor(private readonly blogPostRepository: TypeOrmBlogPostRepository) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createBlogDto: CreateBlogPostDto) {
    const createBlogPostUseCase = new CreateBlogPostUseCase(
      this.blogPostRepository,
    );
    const blogPost = await createBlogPostUseCase.execute(
      createBlogDto.title,
      createBlogDto.content,
      createBlogDto.authorId,
    );
    return blogPost;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const getBlogPostByIdUseCase = new GetBlogPostByIdUseCase(
        this.blogPostRepository,
      );
      const blogPost = await getBlogPostByIdUseCase.execute(id);
      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }
      return blogPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Blog post not found');
    }
  }
}
