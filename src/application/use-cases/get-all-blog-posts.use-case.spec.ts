import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepositoryInterface } from '../../infrastructure/repositories/blog-post.repository.interface';
import { GetAllBlogPostsUseCase } from './get-all-blog-posts.use-case';

describe('GetAllBlogPostsUseCase', () => {
  it('should retrieve all blog posts', async () => {
    const blogPosts = [
      new BlogPost('1', 'Test Title 1', 'Test Content 1', 'author1'),
      new BlogPost('2', 'Test Title 2', 'Test Content 2', 'author2'),
      new BlogPost('3', 'Test Title 3', 'Test Content 3', 'author3'),
    ];

    const mockBlogPostRepository: BlogPostRepositoryInterface = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn().mockResolvedValue(blogPosts),
      delete: jest.fn(),
    };

    const getAllBlogPostsUseCase = new GetAllBlogPostsUseCase(
      mockBlogPostRepository,
    );
    const retrievedPosts = await getAllBlogPostsUseCase.execute();

    // Add a simple console log to track the status
    console.log(
      'Test Status: All blog posts retrieved successfully:',
      retrievedPosts,
    );

    expect(retrievedPosts).toBe(blogPosts);
    expect(mockBlogPostRepository.findAll).toHaveBeenCalled();
    expect(retrievedPosts.length).toBe(3);
  });

  it('should return an empty array when there are no blog posts', async () => {
    const mockBlogPostRepository: BlogPostRepositoryInterface = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn().mockResolvedValue([]),
      delete: jest.fn(),
    };

    const getAllBlogPostsUseCase = new GetAllBlogPostsUseCase(
      mockBlogPostRepository,
    );
    const retrievedPosts = await getAllBlogPostsUseCase.execute();

    console.log(
      'Test Status: Empty array retrieved when no blog posts:',
      retrievedPosts,
    );

    expect(retrievedPosts).toEqual([]);
    expect(mockBlogPostRepository.findAll).toHaveBeenCalled();
    expect(retrievedPosts.length).toBe(0);
  });
});
