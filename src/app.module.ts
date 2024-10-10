import { Module } from '@nestjs/common';
import { BlogController } from './presentation/controllers/blog.controller';
import { CreateBlogPostUseCase } from './application/create-blog-post.use-case';
import { BlogPostRepository } from './infrastructure/blog-post.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [BlogController, AppController],
  providers: [CreateBlogPostUseCase, BlogPostRepository, AppService],
})
export class AppModule {}
