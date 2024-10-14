import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty({
    description: 'Title of the blog post',
    minimum: 5,
    maximum: 100,
  })
  @IsString()
  @Length(5, 100)
  title: string;

  @ApiProperty({
    description: 'Content of the blog post',
    minimum: 10,
    maximum: 5000,
  })
  @IsString()
  @Length(10, 5000)
  content: string;

  @ApiProperty({ description: 'Author ID of the blog post' })
  @IsString()
  authorId: string;
}
