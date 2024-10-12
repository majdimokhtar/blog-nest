import { log } from 'console';
import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepositoryInterface } from '../../infrastructure/repositories/blog-post.repository.interface';
import { GetBlogPostByIdUseCase } from './get-blog-post-by-id.use-case';

// describe('GetBlogPostByIdUseCase', () => {
//   it('should retrieve a blog post by its ID', async () => {
//     // Made test async
//     const blogPost = new BlogPost('1', 'Test Title', 'Test Content' , 'auther123');

//     const mockBlogPostRepository: BlogPostRepositoryInterface = {
//       save: jest.fn(),
//       findById: jest.fn().mockResolvedValue(blogPost), // Changed to mockResolvedValue
//       findAll: jest.fn(),
//     };

//     const getBlogPostByIdUseCase = new GetBlogPostByIdUseCase(
//       mockBlogPostRepository,
//     );
//     const retrievedPost = await getBlogPostByIdUseCase.execute('1'); // Added await

//     expect(retrievedPost).toBe(blogPost);
//     expect(mockBlogPostRepository.findById).toHaveBeenCalledWith('1');
//   });
// });

describe('GetBlogPostByIdUseCase', () => {
  it('should retrieve a blog post by its ID', async () => {
    const blogPost = new BlogPost(
      '1',
      'Test Title',
      'Test Content',
      'auther123',
    );

    const mockBlogPostRepository: BlogPostRepositoryInterface = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(blogPost),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    const getBlogPostByIdUseCase = new GetBlogPostByIdUseCase(
      mockBlogPostRepository,
    );
    const retrievedPost = await getBlogPostByIdUseCase.execute('1');

    // Add a simple console log to track the status
    console.log(
      'Test Status: Blog post retrieved successfully:',
      retrievedPost,
    );

    expect(retrievedPost).toBe(blogPost);
    expect(mockBlogPostRepository.findById).toHaveBeenCalledWith('1');
  });
});
