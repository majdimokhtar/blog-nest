// import { BlogPost } from '../../domain/blog-post.entity';
// import { GetBlogPostByIdUseCase } from './get-blog-post-by-id.use-case';
// import { BlogPostRepository } from '../../infrastructure/repositories/blog-post.repository.interface';

// describe('GetBlogPostByIdUseCase', () => {
//   it('should retrieve a blog post by its ID', () => {
//     const blogPost = new BlogPost(
//       '1',
//       'Test Title',
//       'Test Content',
//       'author123',
//       new Date(),
//       new Date(),
//     );

//     // Mock the repository
//     const blogPostRepository: BlogPostRepository = {
//       save: jest.fn(),
//       findById: jest.fn().mockReturnValue(blogPost), // Mocking findById method
//       findAll: jest.fn(),
//     };

//     const getBlogPostByIdUseCase = new GetBlogPostByIdUseCase(
//       blogPostRepository,
//     );

//     const retrievedPost = getBlogPostByIdUseCase.execute('1');
//     expect(retrievedPost).toBe(blogPost);
//   });
// });

// import { BlogPost } from '../../domain/blog-post.entity';
// import { BlogPostRepository } from '../../infrastructure/repositories/blog-post.repository.interface';
// import { GetBlogPostByIdUseCase } from './get-blog-post-by-id.use-case';

// describe('GetBlogPostByIdUseCase', () => {
//   it('should retrieve a blog post by its ID', () => {
//     const blogPost = new BlogPost(
//       '1',
//       'Test Title',
//       'Test Content',
//       // 'author123',
//       // new Date(),
//       // new Date(),
//     );

//     // Create a mock repository that implements BlogPostRepository interface
//     const mockBlogPostRepository: BlogPostRepository = {
//       save: jest.fn(),
//       findById: jest.fn().mockReturnValue(blogPost),
//       findAll: jest.fn(),
//     };

//     const getBlogPostByIdUseCase = new GetBlogPostByIdUseCase(
//       mockBlogPostRepository,
//     );
//     const retrievedPost = getBlogPostByIdUseCase.execute('1');

//     expect(retrievedPost).toBe(blogPost);
//     expect(mockBlogPostRepository.findById).toHaveBeenCalledWith('1');
//   });
// });

import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from '../../infrastructure/repositories/blog-post.repository.interface';
import { GetBlogPostByIdUseCase } from './get-blog-post-by-id.use-case';

describe('GetBlogPostByIdUseCase', () => {
  it('should retrieve a blog post by its ID', async () => {
    // Made test async
    const blogPost = new BlogPost('1', 'Test Title', 'Test Content' , 'auther123');

    const mockBlogPostRepository: BlogPostRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(blogPost), // Changed to mockResolvedValue
      findAll: jest.fn(),
    };

    const getBlogPostByIdUseCase = new GetBlogPostByIdUseCase(
      mockBlogPostRepository,
    );
    const retrievedPost = await getBlogPostByIdUseCase.execute('1'); // Added await

    expect(retrievedPost).toBe(blogPost);
    expect(mockBlogPostRepository.findById).toHaveBeenCalledWith('1');
  });
});
