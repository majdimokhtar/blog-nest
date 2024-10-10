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


export class CreateBlogPostUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  execute(title: string, content: string, authorId: string): BlogPost {
    const blogPost = new BlogPost(title, content, authorId); // Only pass title, content, and authorId
    this.blogPostRepository.save(blogPost);
    return blogPost;
  }
}

