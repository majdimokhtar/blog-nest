import { log } from 'console';
import { CreateBlogPostUseCase } from '../../../src/application/use-cases/create-blog-post.use-case';
import { BlogPost } from '../../../src/domain/blog-post.entity';
import { BlogPostRepositoryInterface } from '../../../src/infrastructure/repositories/blog-post.repository.interface';
import { v4 as uuidv4 } from 'uuid';

// Mock UUID to return a consistent value for testing
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

// describe('CreateBlogPostUseCase', () => {
//   let createBlogPostUseCase: CreateBlogPostUseCase;
//   let mockBlogPostRepository: jest.Mocked<BlogPostRepositoryInterface>;

//   beforeEach(() => {
//     // Create a mock repository with all required methods
//     mockBlogPostRepository = {
//       save: jest.fn().mockResolvedValue(undefined),
//       findById: jest.fn(),
//       findAll: jest.fn(),
//     };

//     createBlogPostUseCase = new CreateBlogPostUseCase(mockBlogPostRepository);
//   });

//   it('should create a new blog post with valid details', () => {
//     // Arrange
//     const title = 'Test Title';
//     const content = 'Test Content';
//     const authorId = 'test-author-id';

//     // Act
//     const blogPost = createBlogPostUseCase.execute(title, content, authorId);

//     // Assert
//     expect(blogPost).toBeInstanceOf(BlogPost);
//     expect(blogPost.id).toBe('test-uuid');
//     expect(blogPost.title).toBe(title);
//     expect(blogPost.content).toBe(content);
//     expect(blogPost.authorId).toBe(authorId);

//     expect(mockBlogPostRepository.save).toHaveBeenCalledWith(
//       expect.objectContaining({
//         id: 'test-uuid',
//         title,
//         content,
//         authorId,
//       }),
//     );
//   });
// });

describe('CreateBlogPostUseCase', () => {
  let createBlogPostUseCase: CreateBlogPostUseCase;
  let mockBlogPostRepository: jest.Mocked<BlogPostRepositoryInterface>;

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

    // Add console log to check blog post creation status
    console.log('Test Status: Blog post created successfully:', blogPost);

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
