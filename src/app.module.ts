import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './presentation/controllers/blog.controller';
import { BlogPost } from './domain/blog-post.entity';
import { TypeOrmBlogPostRepository } from './infrastructure/repositories/typeorm-blog-post.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bloguser',
      password: 'blogpass',
      database: 'blogdb',
      entities: [BlogPost],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BlogPost]),
  ],
  controllers: [BlogController, AppController],
  providers: [TypeOrmBlogPostRepository, AppService],
})
export class AppModule {}
