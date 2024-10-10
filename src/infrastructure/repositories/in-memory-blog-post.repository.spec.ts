import { BlogPost } from '../../domain/blog-post.entity';
import { InMemoryBlogPostRepository } from './in-memory-blog-post.repository';

describe('InMemoryBlogPostRepository', () => {
  let repository: InMemoryBlogPostRepository;

  beforeEach(() => {
    repository = new InMemoryBlogPostRepository();
  });

  it('should save a blog post', () => {
    const blogPost = new BlogPost(
      '1',
      'Test Title',
      'Test Content',
      'author123',
      new Date(),
      new Date(),
    );
    repository.save(blogPost);

    const foundPost = repository.findById('1');
    expect(foundPost).toEqual(blogPost);
  });

  it('should find a blog post by ID', () => {
    const blogPost1 = new BlogPost(
      '1',
      'Title 1',
      'Content 1',
      'author123',
      new Date(),
      new Date(),
    );
    const blogPost2 = new BlogPost(
      '2',
      'Title 2',
      'Content 2',
      'author123',
      new Date(),
      new Date(),
    );
    repository.save(blogPost1);
    repository.save(blogPost2);

    const foundPost = repository.findById('2');
    expect(foundPost).toEqual(blogPost2);
  });

  it('should return all saved blog posts', () => {
    const blogPost1 = new BlogPost(
      '1',
      'Title 1',
      'Content 1',
      'author123',
      new Date(),
      new Date(),
    );
    const blogPost2 = new BlogPost(
      '2',
      'Title 2',
      'Content 2',
      'author123',
      new Date(),
      new Date(),
    );
    repository.save(blogPost1);
    repository.save(blogPost2);

    const allPosts = repository.findAll();
    expect(allPosts).toEqual([blogPost1, blogPost2]);
  });
});
