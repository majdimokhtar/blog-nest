import { CreateBlogPostUseCase } from '../create-blog-post.use-case';
import { BlogPost } from '../../domain/blog-post.entity';

describe('CreateBlogPostUseCase', () => {
  it('should create a new blog post with valid details', () => {
    const createBlogPostUseCase = new CreateBlogPostUseCase();
    const blogPost = createBlogPostUseCase.execute(
      'Test Title',
      'Test Content',
      'author123',
    );

    expect(blogPost).toBeInstanceOf(BlogPost);
    expect(blogPost.title).toBe('Test Title');
    expect(blogPost.content).toBe('Test Content');
    expect(blogPost.authorId).toBe('author123');
  });
});

