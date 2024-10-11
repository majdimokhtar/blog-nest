import { BlogPost } from '../domain/blog-post.entity';
import { BlogPostRepositoryInterface} from './repositories/blog-post.repository.interface';

export class BlogPostRepository implements BlogPostRepositoryInterface {
  private blogPosts: BlogPost[] = [];

  async save(blogPost: BlogPost): Promise<void> {
    this.blogPosts.push(blogPost);
  }

  async findById(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find((post) => post.id === id);
  }

  async findAll(): Promise<BlogPost[]> {
    return [...this.blogPosts];
  }
}
