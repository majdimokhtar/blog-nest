import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BlogController } from './blog.controller';
import { BlogPost } from '../../domain/blog-post.entity';
import { TypeOrmBlogPostRepository } from '../../infrastructure/repositories/typeorm-blog-post.repository';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

describe('BlogController - DELETE (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let jwtService: JwtService;

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
        PassportModule,
        JwtModule.register({
          secret: 'secretKey',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [BlogController],
      providers: [TypeOrmBlogPostRepository, JwtAuthGuard, JwtStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    jwtToken = jwtService.sign({ sub: 'testUser', username: 'testUser' });

    console.log('Generated JWT token:', jwtToken);
  });

  describe('DELETE /blog/:id', () => {
    let createdPostId: string;

    beforeEach(async () => {
      // Create a test post with authentication
      const createResponse = await request(app.getHttpServer())
        .post('/blog')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          title: 'Test Post for Delete',
          content: 'This is test content that is definitely long enough',
          authorId: 'author123',
        });

      createdPostId = createResponse.body.id;
      console.log('Created Post ID for delete:', createdPostId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('should delete an existing post', async () => {
      console.log('Testing DELETE /blog/:id with valid post');
      const deleteResponse = await request(app.getHttpServer())
        .delete(`/blog/${createdPostId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      console.log('DELETE request response status:', deleteResponse.status);
      expect(deleteResponse.body).toHaveProperty(
        'message',
        'Blog post deleted successfully',
      );
    });

    it('should return 404 when deleting a non-existent post', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      console.log('Testing DELETE /blog/:id with non-existent post');
      const deleteResponse = await request(app.getHttpServer())
        .delete(`/blog/${nonExistentId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(404);

      console.log(
        'DELETE non-existent post request status:',
        deleteResponse.status,
      );
      expect(deleteResponse.body).toHaveProperty(
        'message',
        'Blog post not found',
      );
    });

    it('should return 401 when deleting without authentication', async () => {
      console.log('Testing DELETE /blog/:id without authentication');
      const deleteResponse = await request(app.getHttpServer())
        .delete(`/blog/${createdPostId}`)
        .expect(401);

      console.log('Unauthorized DELETE request status:', deleteResponse.status);
    });
  });

  afterAll(async () => {
    console.log('Closing application');
    await app.close();
  });
});
