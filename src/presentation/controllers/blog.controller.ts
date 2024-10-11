import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Patch,
  Inject,
} from '@nestjs/common';
import { CreateBlogPostUseCase } from '../../application/use-cases/create-blog-post.use-case';
import { GetBlogPostByIdUseCase } from '../../application/use-cases/get-blog-post-by-id.use-case';
import { TypeOrmBlogPostRepository } from '../../infrastructure/repositories/typeorm-blog-post.repository';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../dto/update-blog-post.dto';
import { UpdateBlogPostContentUseCase } from '../../application/use-cases/update-blog-post-content.use-case';
import { BlogPostRepository } from '../../infrastructure/blog-post.repository';

@Controller('blog')
export class BlogController {
  constructor(
    @Inject(TypeOrmBlogPostRepository)
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

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

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    try {
      const updateBlogPostUseCase = new UpdateBlogPostContentUseCase(
        this.blogPostRepository,
      );

      const updatedBlogPost = await updateBlogPostUseCase.execute(
        id,
        updateBlogPostDto.content,
      );

      return updatedBlogPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Error updating blog post');
    }
  }
}
