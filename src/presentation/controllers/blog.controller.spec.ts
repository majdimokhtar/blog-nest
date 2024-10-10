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

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('BlogController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/blog (POST) should create a blog post', () => {
    return request(app.getHttpServer())
      .post('/blog')
      .send({
        title: 'Valid Title',
        content: 'Valid Content that is long enough',
        authorId: 'author123',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.title).toBe('Valid Title');
        expect(response.body.content).toBe('Valid Content that is long enough');
        expect(response.body.authorId).toBe('author123');
      });
  });

  it('/blog (POST) should return 400 if input is invalid', () => {
    return request(app.getHttpServer())
      .post('/blog')
      .send({ title: 'shrt', content: 'too short', authorId: 'author123' })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toContain(
          'title must be longer than or equal to 5 characters',
        );
        expect(response.body.message).toContain(
          'content must be longer than or equal to 20 characters',
        );
      });
  });

  it('/blog/:id (GET) should return 404 if blog post not found', () => {
    return request(app.getHttpServer())
      .get('/blog/nonexistent-id')
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('Blog post not found');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
