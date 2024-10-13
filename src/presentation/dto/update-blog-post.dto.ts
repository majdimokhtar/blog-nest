import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBlogPostDto {
  @ApiPropertyOptional({
    description: 'Optional title of the blog post',
    example: 'Updated Blog Post Title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Optional content of the blog post',
    example: 'Updated content of the blog post...',
  })
  @IsString()
  @IsOptional()
  content?: string;
}
