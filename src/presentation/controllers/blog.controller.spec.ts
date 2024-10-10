// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../../app.module';

// describe('BlogController (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/blog (POST) should create a blog post', () => {
//     return request(app.getHttpServer())
//       .post('/blog')
//       .send({
//         title: 'Test Post',
//         content: 'Test Content',
//         authorId: 'author123',
//       })
//       .expect(201)
//       .then((response) => {
//         expect(response.body.title).toBe('Test Post');
//         expect(response.body.content).toBe('Test Content');
//         expect(response.body.authorId).toBe('author123');
//       });
//   });

//   it('/blog/:id (GET) should retrieve a blog post by ID', async () => {
//     const createResponse = await request(app.getHttpServer())
//       .post('/blog')
//       .send({
//         title: 'Test Post',
//         content: 'Test Content',
//         authorId: 'author123',
//       });

//     const postId = createResponse.body.id;

//     return request(app.getHttpServer())
//       .get(`/blog/${postId}`)
//       .expect(200)
//       .then((response) => {
//         expect(response.body.id).toBe(postId);
//         expect(response.body.title).toBe('Test Post');
//       });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { TypeOrmBlogPostRepository } from '../../infrastructure/repositories/typeorm-blog-post.repository';
// import { BlogController } from './blog.controller';

// describe('BlogController (e2e)', () => {
//   let app: INestApplication;
//   let blogPostRepository: TypeOrmBlogPostRepository;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       controllers: [BlogController],
//       providers: [
//         {
//           provide: TypeOrmBlogPostRepository,
//           useValue: {
//             findById: jest.fn(),
//             save: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     blogPostRepository = moduleFixture.get<TypeOrmBlogPostRepository>(
//       TypeOrmBlogPostRepository,
//     );
//     await app.init();
//   });

//   afterEach(async () => {
//     await app.close();
//   });

//   describe('/blog/:id (GET)', () => {
//     it('should return 404 if blog post not found', () => {
//       jest.spyOn(blogPostRepository, 'findById').mockResolvedValue(null);

//       return request(app.getHttpServer())
//         .get('/blog/nonexistent-id')
//         .expect(404)
//         .then((response) => {
//           expect(response.body.message).toBe('Blog post not found');
//         });
//     });
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, NotFoundException } from '@nestjs/common';
// import * as request from 'supertest';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { BlogController } from './blog.controller';
// import { BlogPost } from '../../domain/blog-post.entity';
// import { TypeOrmBlogPostRepository } from '../../infrastructure/repositories/typeorm-blog-post.repository';
// import { CreateBlogPostDto } from '../dto/create-blog-post.dto';

// describe('BlogController (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'postgres',
//           host: 'localhost',
//           port: 5432,
//           username: 'bloguser',
//           password: 'blogpass',
//           database: 'blogdb',
//           entities: [BlogPost],
//           synchronize: true,
//         }),
//         TypeOrmModule.forFeature([BlogPost]),
//       ],
//       controllers: [BlogController],
//       providers: [TypeOrmBlogPostRepository],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   describe('POST /blog', () => {
//     it('should create a blog post', () => {
//       const createBlogDto: CreateBlogPostDto = {
//         title: 'Test Post',
//         content: 'Test Content that is long enough',
//         authorId: 'author123',
//       };

//       return request(app.getHttpServer())
//         .post('/blog')
//         .send(createBlogDto)
//         .expect(201)
//         .then((response) => {
//           expect(response.body.title).toBe(createBlogDto.title);
//           expect(response.body.content).toBe(createBlogDto.content);
//           expect(response.body.authorId).toBe(createBlogDto.authorId);
//           expect(response.body.id).toBeDefined();
//         });
//     });

//     it('should return 400 if input is invalid', () => {
//       const invalidBlogDto = {
//         title: 'shrt',
//         content: 'too short',
//         authorId: 'author123',
//         invalidField: 'this should cause an error',
//       };

//       return request(app.getHttpServer())
//         .post('/blog')
//         .send(invalidBlogDto)
//         .expect(400)
//         .then((response) => {
//           expect(response.body.message).toEqual(
//             expect.arrayContaining([
//               expect.stringContaining('title must be longer than'),
//               expect.stringContaining('content must be longer than'),
//             ]),
//           );
//           // Check for forbidden non-whitelisted properties error
//           expect(response.body.message).toEqual(
//             expect.arrayContaining([
//               expect.stringContaining('property invalidField should not exist'),
//             ]),
//           );
//         });
//     });
//   });

//   describe('GET /blog/:id', () => {
//     let createdPostId: string;

//     beforeEach(async () => {
//       // Create a blog post to test with
//       const createResponse = await request(app.getHttpServer())
//         .post('/blog')
//         .send({
//           title: 'Test Post for Get',
//           content: 'This is test content that is definitely long enough',
//           authorId: 'author123',
//         });
//       createdPostId = createResponse.body.id;
//     });

//     it('should retrieve a blog post by ID', () => {
//       return request(app.getHttpServer())
//         .get(`/blog/${createdPostId}`)
//         .expect(200)
//         .then((response) => {
//           expect(response.body.id).toBe(createdPostId);
//           expect(response.body.title).toBe('Test Post for Get');
//         });
//     });

//     it('should return 404 if blog post not found', () => {
//       return request(app.getHttpServer())
//         .get('/blog/nonexistent-id')
//         .expect(404)
//         .then((response) => {
//           expect(response.body.message).toBe('Blog post not found');
//         });
//     });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });

// // Additional test file for unit tests if needed
// describe('BlogController (unit)', () => {
//   let controller: BlogController;
//   let repository: TypeOrmBlogPostRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [BlogController],
//       providers: [
//         {
//           provide: TypeOrmBlogPostRepository,
//           useValue: {
//             save: jest.fn(),
//             findById: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<BlogController>(BlogController);
//     repository = module.get<TypeOrmBlogPostRepository>(
//       TypeOrmBlogPostRepository,
//     );
//   });

//   describe('getById', () => {
//     it('should throw NotFoundException when post is not found', async () => {
//       jest.spyOn(repository, 'findById').mockResolvedValue(null);

//       await expect(controller.getById('nonexistent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });
// });

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
