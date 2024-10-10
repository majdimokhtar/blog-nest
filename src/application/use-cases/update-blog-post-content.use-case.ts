import { BlogPost } from '../../domain/blog-post.entity';

export class UpdateBlogPostContentUseCase {
  execute(blogPost: BlogPost, newContent: string): void {
    blogPost.updateContent(newContent);
  }
}
