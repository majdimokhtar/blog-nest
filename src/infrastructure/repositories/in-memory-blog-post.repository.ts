import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from './blog-post.repository.interface';

export class InMemoryBlogPostRepository implements BlogPostRepository {
  private blogPosts: BlogPost[] = [];

  save(blogPost: BlogPost): void {
    this.blogPosts.push(blogPost);
  }

  findById(id: string): BlogPost | undefined {
    return this.blogPosts.find((post) => post.id === id);
  }

  findAll(): BlogPost[] {
    return [...this.blogPosts];
  }
}
