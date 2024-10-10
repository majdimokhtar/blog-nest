// import { BlogPost } from '../../domain/blog-post.entity';

// export class CreateBlogPostUseCase {
//   execute(title: string, content: string, authorId: string): BlogPost {
//     const id = Math.random().toString(36).slice(2, 11); // Temporary ID generation
//     const now = new Date();
//     return new BlogPost(id, title, content, authorId, now, now);
//   }
// }

import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from '../../infrastructure/repositories/blog-post.repository.interface';

export class CreateBlogPostUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  execute(title: string, content: string, authorId: string): BlogPost {
    const id = Math.random().toString(36).slice(2, 11); // Temporary ID generation
    const now = new Date();
    const blogPost = new BlogPost(id, title, content, authorId, now, now);
    this.blogPostRepository.save(blogPost);
    return blogPost;
  }
}
