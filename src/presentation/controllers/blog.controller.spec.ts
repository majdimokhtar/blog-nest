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


describe('BlogController (e2e)', () => {
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

    // Generate a valid JWT token for testing
    jwtService = moduleFixture.get<JwtService>(JwtService);
    jwtToken = jwtService.sign({ sub: 'testUser', username: 'testUser' });

    // Log JWT token for debug
    console.log('Generated JWT token:', jwtToken);
  });

  describe('POST /blog', () => {
    it('should create a blog post when authenticated', () => {
      console.log('Testing POST /blog with authentication');
      return request(app.getHttpServer())
        .post('/blog')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          title: 'Test Post',
          content: 'This is test content that is definitely long enough',
          authorId: 'author123',
        })
        .expect(201)
        .then((response) => {
          console.log('Authenticated POST request status:', response.status);
          expect(response.body.title).toBe('Test Post');
          expect(response.body.content).toBe(
            'This is test content that is definitely long enough',
          );
        });
    });

    it('should return 401 when not authenticated', () => {
      console.log('Testing POST /blog without authentication');
      return request(app.getHttpServer())
        .post('/blog')
        .send({
          title: 'Test Post',
          content: 'This is test content',
          authorId: 'author123',
        })
        .expect(401)
        .then((response) => {
          console.log('Unauthenticated POST request status:', response.status);
        });
    });
  });

  describe('GET /blog/:id', () => {
    let createdPostId: string;

    beforeEach(async () => {
      // Create a test post with authentication
      const createResponse = await request(app.getHttpServer())
        .post('/blog')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          title: 'Test Post for Get',
          content: 'This is test content that is definitely long enough',
          authorId: 'author123',
        });

      createdPostId = createResponse.body.id;
      console.log('Created Post ID:', createdPostId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('should retrieve a blog post by ID (no auth required)', async () => {
      console.log('Testing GET /blog/:id');
      const getResponse = await request(app.getHttpServer())
        .get(`/blog/${createdPostId}`)
        .expect(200);

      console.log('GET request response status:', getResponse.status);
      expect(getResponse.body.id).toBe(createdPostId);
      expect(getResponse.body.title).toBe('Test Post for Get');
    });

    it('should return 404 if blog post not found', () => {
      console.log('Testing GET /blog with non-existent post');
      return request(app.getHttpServer())
        .get('/blog/nonexistent-id')
        .expect(404)
        .then((response) => {
          console.log('GET request non-existent post status:', response.status);
          expect(response.body.message).toBe('Blog post not found');
        });
    });
  });

  describe('PATCH /blog/:id', () => {
    let createdPostId: string;

    beforeEach(async () => {
      // Create a test post with authentication
      const createResponse = await request(app.getHttpServer())
        .post('/blog')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          title: 'Test Post for Update',
          content: 'This is the original content',
          authorId: 'author123',
        });

      createdPostId = createResponse.body.id;
      console.log('Created Post ID for update:', createdPostId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('should update a blog post content when authenticated', async () => {
      const updatedContent = 'This is the updated content';
      console.log('Testing PATCH /blog with valid authentication');
      const updateResponse = await request(app.getHttpServer())
        .patch(`/blog/${createdPostId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          content: updatedContent,
        })
        .expect(200);

      console.log('PATCH request response status:', updateResponse.status);
      expect(updateResponse.body.id).toBe(createdPostId);
      expect(updateResponse.body.content).toBe(updatedContent);
    });

    it('should return 401 when updating without authentication', () => {
      console.log('Testing PATCH /blog without authentication');
      return request(app.getHttpServer())
        .patch(`/blog/${createdPostId}`)
        .send({
          content: 'This update should fail',
        })
        .expect(401)
        .then((response) => {
          console.log('Unauthorized PATCH request status:', response.status);
        });
    });

    it('should return 404 when updating non-existent blog post with auth', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      console.log('Testing PATCH /blog with non-existent post');

      return request(app.getHttpServer())
        .patch(`/blog/${nonExistentId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          content: 'This update should fail',
        })
        .expect(404)
        .then((response) => {
          console.log(
            'PATCH non-existent post request status:',
            response.status,
          );
          expect(response.body.message).toBe('Blog post not found');
        });
    });
  });

  afterAll(async () => {
    console.log('Closing application');
    await app.close();
  });
});
