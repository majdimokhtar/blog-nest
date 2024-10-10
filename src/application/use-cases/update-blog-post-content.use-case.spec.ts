import { BlogPost } from '../../domain/blog-post.entity';
import { UpdateBlogPostContentUseCase } from './update-blog-post-content.use-case';

describe('UpdateBlogPostContentUseCase', () => {
  it('should update the content of an existing blog post', () => {
    const blogPost = new BlogPost(
      '1',
      'Test Title',
      'Old Content',
      'author123',
      new Date(),
      new Date(),
    );
    const updateBlogPostContentUseCase = new UpdateBlogPostContentUseCase();

    updateBlogPostContentUseCase.execute(blogPost, 'New Content');

    expect(blogPost.content).toBe('New Content');
  });
});
