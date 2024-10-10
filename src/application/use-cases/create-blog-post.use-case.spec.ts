// import { CreateBlogPostUseCase } from '../create-blog-post.use-case';
// import { BlogPost } from '../../domain/blog-post.entity';

// describe('CreateBlogPostUseCase', () => {
//   it('should create a new blog post with valid details', () => {
//     const createBlogPostUseCase = new CreateBlogPostUseCase();
//     const blogPost = createBlogPostUseCase.execute(
//       'Test Title',
//       'Test Content',
//       'author123',
//     );

//     expect(blogPost).toBeInstanceOf(BlogPost);
//     expect(blogPost.title).toBe('Test Title');
//     expect(blogPost.content).toBe('Test Content');
//     expect(blogPost.authorId).toBe('author123');
//   });
// });
// import { CreateBlogPostUseCase } from '../create-blog-post.use-case';
// import { BlogPost } from '../../domain/blog-post.entity';
// import { BlogPostRepository } from '../../../src/infrastructure/blog-post.repository';

// describe('CreateBlogPostUseCase', () => {
//   it('should create a new blog post with valid details', () => {
//     // Create a mock BlogPostRepository
//     const mockBlogPostRepository: BlogPostRepository = {
//       save: jest.fn().mockImplementation((blogPost: BlogPost) => blogPost),
//       // Implement other methods if necessary
//     };

//     const createBlogPostUseCase = new CreateBlogPostUseCase(
//       mockBlogPostRepository,
//     );

//     const blogPost = createBlogPostUseCase.execute(
//       'Test Title',
//       'Test Content',
//       'author123',
//     );

//     expect(blogPost).toBeInstanceOf(BlogPost);
//     expect(blogPost.title).toBe('Test Title');
//     expect(blogPost.content).toBe('Test Content');
//     expect(blogPost.authorId).toBe('author123');
//     expect(mockBlogPostRepository.save).toHaveBeenCalledWith(blogPost);
//   });
// });import { mock } from 'node:test';

import { CreateBlogPostUseCase } from '../../../src/application/use-cases/create-blog-post.use-case';
import { BlogPost } from '../../../src/domain/blog-post.entity';
import { BlogPostRepository } from '../../../src/infrastructure/repositories/blog-post.repository.interface';
import { v4 as uuidv4 } from 'uuid';

// Mock UUID to return a consistent value for testing
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

describe('CreateBlogPostUseCase', () => {
  let createBlogPostUseCase: CreateBlogPostUseCase;
  let mockBlogPostRepository: jest.Mocked<BlogPostRepository>;

  beforeEach(() => {
    // Create a mock repository with all required methods
    mockBlogPostRepository = {
      save: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    createBlogPostUseCase = new CreateBlogPostUseCase(mockBlogPostRepository);
  });

  it('should create a new blog post with valid details', () => {
    // Arrange
    const title = 'Test Title';
    const content = 'Test Content';
    const authorId = 'test-author-id';

    // Act
    const blogPost = createBlogPostUseCase.execute(title, content, authorId);

    // Assert
    expect(blogPost).toBeInstanceOf(BlogPost);
    expect(blogPost.id).toBe('test-uuid');
    expect(blogPost.title).toBe(title);
    expect(blogPost.content).toBe(content);
    expect(blogPost.authorId).toBe(authorId);

    expect(mockBlogPostRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'test-uuid',
        title,
        content,
        authorId,
      }),
    );
  });
});
