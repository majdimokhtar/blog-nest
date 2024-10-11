import { BlogPost } from '../../domain/blog-post.entity';

export interface BlogPostRepositoryInterface {
  save(blogPost: BlogPost): Promise<void>;
  findById(id: string): Promise<BlogPost | undefined>;
  findAll(): Promise<BlogPost[]>;
}
