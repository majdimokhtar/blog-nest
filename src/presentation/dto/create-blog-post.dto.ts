import { IsString, Length } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @Length(5, 100)
  title: string;

  @IsString()
  @Length(20, 5000)
  content: string;

  @IsString()
  authorId: string;
}
 