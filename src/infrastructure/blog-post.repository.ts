// import { BlogPost } from '../domain/blog-post.entity';

// export class BlogPostRepository {
//   private blogPosts: BlogPost[] = [];

//   save(blogPost: BlogPost) {
//     this.blogPosts.push(blogPost);
//   }

//   findById(id: string): BlogPost | undefined {
//     return this.blogPosts.find((post) => post.id === id);
//   }
// }

import { BlogPost } from '../domain/blog-post.entity';
import { BlogPostRepository as BlogPostRepositoryInterface } from './repositories/blog-post.repository.interface';

export class BlogPostRepository implements BlogPostRepositoryInterface {
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
