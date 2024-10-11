import { BlogPost } from '../../domain/blog-post.entity';
import { BlogPostRepository } from '../../infrastructure/repositories/blog-post.repository.interface';
import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate a unique id

export class CreateBlogPostUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  execute(title: string, content: string, authorId: string): BlogPost {
    const id = uuidv4(); // Generate a new UUID for the blog post
    const blogPost = new BlogPost(id, title, content, authorId); // Pass the id along with other details
    this.blogPostRepository.save(blogPost);
    return blogPost;
  }
}
