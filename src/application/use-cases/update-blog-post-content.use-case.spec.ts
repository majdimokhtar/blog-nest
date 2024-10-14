import { NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from '../../infrastructure/blog-post.repository';
import { UpdateBlogPostContentUseCase } from './update-blog-post-content.use-case';
import { BlogPost } from '../../domain/blog-post.entity';

describe('UpdateBlogPostContentUseCase Integration Test', () => {
  let blogPostRepository: BlogPostRepository;
  let updateBlogPostContentUseCase: UpdateBlogPostContentUseCase;

  beforeEach(() => {
    blogPostRepository = new BlogPostRepository();
    updateBlogPostContentUseCase = new UpdateBlogPostContentUseCase(
      blogPostRepository,
    );
    console.log(
      'Test setup: Created new BlogPostRepository and UpdateBlogPostContentUseCase',
    );
  });

  it('should update the content of an existing blog post', async () => {
    // Arrange
    const blogPost = new BlogPost(
      '1',
      'Test Title',
      'Original Content',
      'author123',
    );
    await blogPostRepository.save(blogPost);
    console.log('Arranged: Saved initial blog post', blogPost);

    // Act
    console.log('Acting: Updating blog post content');
    const updatedBlogPost = await updateBlogPostContentUseCase.execute(
      '1',
      'Updated Content',
    );
    console.log('Updated blog post', updatedBlogPost);

    // Assert
    expect(updatedBlogPost.content).toBe('Updated Content');
    expect(updatedBlogPost.id).toBe('1');
    expect(updatedBlogPost.title).toBe('Test Title');
    expect(updatedBlogPost.authorId).toBe('author123');

    // Verify that the blog post was actually updated in the repository
    const retrievedBlogPost = await blogPostRepository.findById('1');
    console.log(
      'Retrieved updated blog post from repository',
      retrievedBlogPost,
    );
    expect(retrievedBlogPost?.content).toBe('Updated Content');
  });

  it('should throw NotFoundException when trying to update a non-existent blog post', async () => {
    // Act & Assert
    console.log('Acting: Attempting to update non-existent blog post');
    await expect(
      updateBlogPostContentUseCase.execute('non-existent-id', 'New Content'),
    ).rejects.toThrow(NotFoundException);
    console.log('Assert: NotFoundException was thrown as expected');
  });

  it('should update the updatedAt timestamp when updating content', async () => {
    // Arrange
    const blogPost = new BlogPost(
      '2',
      'Another Test',
      'Original Content',
      'author456',
    );
    await blogPostRepository.save(blogPost);
    const originalUpdatedAt = blogPost.updatedAt;
    console.log(
      'Arranged: Saved initial blog post with updatedAt',
      originalUpdatedAt,
    );

    // Wait a bit to ensure the timestamp will be different
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Act
    console.log('Acting: Updating blog post content');
    const updatedBlogPost = await updateBlogPostContentUseCase.execute(
      '2',
      'Fresh Content',
    );
    console.log(
      'Updated blog post with new updatedAt',
      updatedBlogPost.updatedAt,
    );

    // Assert
    expect(updatedBlogPost.updatedAt.getTime()).toBeGreaterThan(
      originalUpdatedAt.getTime(),
    );
    console.log('Assert: updatedAt timestamp has increased');
  });
});
