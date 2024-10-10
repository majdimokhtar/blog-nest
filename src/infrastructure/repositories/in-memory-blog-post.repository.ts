// import { BlogPost } from '../../domain/blog-post.entity';
// import { BlogPostRepository } from './blog-post.repository.interface';

// export class InMemoryBlogPostRepository implements BlogPostRepository {
//   private blogPosts: BlogPost[] = [];

//   async save(blogPost: BlogPost): Promise<void> {
//     this.blogPosts.push(blogPost);
//   }

//   async findById(id: string): Promise<BlogPost | undefined> {
//     return this.blogPosts.find((post) => post.id === id);
//   }

//   async findAll(): Promise<BlogPost[]> {
//     return [...this.blogPosts];
//   }
// }

import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from './blog-post.repository.interface';

export class InMemoryBlogPostRepository implements BlogPostRepository {
  private blogPosts: BlogPost[] = [];

  async save(blogPost: BlogPost): Promise<void> {
    const index = this.blogPosts.findIndex((post) => post.id === blogPost.id);
    if (index !== -1) {
      // Update existing post
      this.blogPosts[index] = blogPost;
    } else {
      // Add new post
      this.blogPosts.push(blogPost);
    }
  }

  async findById(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find((post) => post.id === id);
  }

  async findAll(): Promise<BlogPost[]> {
    return [...this.blogPosts];
  }
}
