import { BlogPost } from './blog-post.entity';

describe('BlogPost Entity', () => {
  it('should create a blog post with given values', () => {
    const blogPost = new BlogPost(
      '1',
      'Test Title',
      'Test Content',
      'author123',
    );

    expect(blogPost.id).toEqual('1');
    expect(blogPost.title).toEqual('Test Title');
    expect(blogPost.content).toEqual('Test Content');
    expect(blogPost.authorId).toEqual('author123');
  });

  it('should update the content and updatedAt timestamp', async () => {
    const blogPost = new BlogPost(
      '1',
      'Test Title',
      'Test Content',
      'author123',
    );
    const oldUpdatedAt = blogPost.updatedAt;

    // Wait for a small amount of time to ensure timestamp difference
    await new Promise((resolve) => setTimeout(resolve, 1));

    blogPost.updateContent('Updated Content');

    expect(blogPost.content).toEqual('Updated Content');
    expect(blogPost.updatedAt.getTime()).toBeGreaterThan(
      oldUpdatedAt.getTime(),
    );
  });
});
