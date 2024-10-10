import { BlogPost } from '../../domain/blog-post.entity';

export interface BlogPostRepository {
  save(blogPost: BlogPost): void;
  findById(id: string): BlogPost | undefined;
  findAll(): BlogPost[];
}
