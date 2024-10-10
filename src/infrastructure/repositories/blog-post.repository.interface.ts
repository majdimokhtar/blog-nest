import { BlogPost } from '../../domain/blog-post.entity';

export interface BlogPostRepository {
  save(blogPost: BlogPost): Promise<void>;
  findById(id: string): Promise<BlogPost | undefined>;
  findAll(): Promise<BlogPost[]>;
}
