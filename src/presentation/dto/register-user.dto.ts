import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'The username of the user',
    minLength: 4,
    example: 'johndoe123',
  })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 6,
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
