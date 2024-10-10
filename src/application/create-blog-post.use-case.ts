import { BlogPost } from '../domain/blog-post.entity';

export class CreateBlogPostUseCase {
  execute(title: string, content: string, authorId: string): BlogPost {
    const id = Math.random().toString(36).slice(2, 11); // Temporary ID generation using slice
    return new BlogPost(id, title, content, authorId, new Date(), new Date());
  }
}
