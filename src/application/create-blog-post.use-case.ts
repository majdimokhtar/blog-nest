import { BlogPostRepository } from 'src/infrastructure/blog-post.repository';
import { BlogPost } from '../domain/blog-post.entity';

// export class CreateBlogPostUseCase {
//   constructor(private readonly blogPostRepository: BlogPostRepository) {}

//   execute(title: string, content: string, authorId: string): BlogPost {
//     const blogPost = new BlogPost(title, content, authorId); // Only pass title, content, and authorId
//     this.blogPostRepository.save(blogPost);
//     return blogPost;
//   }
// }
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

export class CreateBlogPostUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  execute(title: string, content: string, authorId: string): BlogPost {
    const id = uuidv4(); // Generate a unique id
    const blogPost = new BlogPost(id, title, content, authorId); // Only pass title, content, and authorId
    this.blogPostRepository.save(blogPost);
    return blogPost;
  }
}
