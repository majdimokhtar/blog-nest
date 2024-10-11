import { IsString, IsOptional } from 'class-validator';

export class UpdateBlogPostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
