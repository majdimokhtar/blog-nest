import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogPost } from '../../domain/blog-post.entity';
import { TypeOrmBlogPostRepository } from '../../infrastructure/repositories/typeorm-blog-post.repository';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';

describe('BlogController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([BlogPost]),
      ],
      controllers: [BlogController],
      providers: [TypeOrmBlogPostRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /blog/:id', () => {
    it('should retrieve a blog post by ID', async () => {
      // First, create a blog post
      const createResponse = await request(app.getHttpServer())
        .post('/blog')
        .send({
          title: 'Test Post for Get',
          content: 'This is test content that is definitely long enough',
          authorId: 'author123',
        });

      expect(createResponse.status).toBe(201); // Verify creation was successful

      const createdPostId = createResponse.body.id;
      console.log('Created post ID:', createdPostId);
      console.log('Created post:', createResponse.body);

      // Add a small delay to ensure the database has processed the creation
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Then try to retrieve it
      const getResponse = await request(app.getHttpServer())
        .get(`/blog/${createdPostId}`)
        .expect(200);

      expect(getResponse.body.id).toBe(createdPostId);
      expect(getResponse.body.title).toBe('Test Post for Get');
    });

    it('should return 404 if blog post not found', () => {
      return request(app.getHttpServer())
        .get('/blog/nonexistent-id')
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('Blog post not found');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
