import { DeleteBlogPostUseCase } from '../../../src/application/use-cases/delete-blog-post.use-case';
import { BlogPost } from '../../../src/domain/blog-post.entity';
import { BlogPostRepositoryInterface } from '../../../src/infrastructure/repositories/blog-post.repository.interface';

describe('DeleteBlogPostUseCase', () => {
  let deleteBlogPostUseCase: DeleteBlogPostUseCase;
  let mockBlogPostRepository: jest.Mocked<BlogPostRepositoryInterface>;

  beforeEach(() => {
    // Create a mock repository with all required methods
    mockBlogPostRepository = {
      save: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined), // Add the mock delete method
    };

    deleteBlogPostUseCase = new DeleteBlogPostUseCase(mockBlogPostRepository);
  });

  it('should delete an existing blog post by ID', async () => {
    // Arrange
    const blogPostId = 'test-uuid';

    // Simulate finding a blog post before deleting
    const existingBlogPost = new BlogPost(
      blogPostId,
      'Test Title',
      'Test Content',
      'test-author-id',
    );
    mockBlogPostRepository.findById.mockResolvedValue(existingBlogPost);

    // Act
    await deleteBlogPostUseCase.execute(blogPostId);

    // Assert that the findById method was called
    expect(mockBlogPostRepository.findById).toHaveBeenCalledWith(blogPostId);

    // Assert that the delete method was called
    expect(mockBlogPostRepository.delete).toHaveBeenCalledWith(blogPostId);
  });

  it('should throw a NotFoundException if the blog post does not exist', async () => {
    // Arrange
    const blogPostId = 'non-existent-id';

    // Simulate no blog post found
    mockBlogPostRepository.findById.mockResolvedValue(undefined);

    // Act & Assert
    await expect(deleteBlogPostUseCase.execute(blogPostId)).rejects.toThrow(
      'Blog post not found',
    );

    // Assert that the delete method was never called
    expect(mockBlogPostRepository.delete).not.toHaveBeenCalled();
  });
});
