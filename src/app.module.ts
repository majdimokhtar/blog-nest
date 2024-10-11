import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './presentation/controllers/blog.controller';
import { BlogPost } from './domain/blog-post.entity';
import { TypeOrmBlogPostRepository } from './infrastructure/repositories/typeorm-blog-post.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './application/auth/auth.service';

import { AuthController } from './presentation/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from './domain/user.entity';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { JwtAuthGuard } from './presentation/auth/jwt-auth.guard';
import { JwtStrategy } from './presentation/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bloguser',
      password: 'blogpass',
      database: 'blogdb',
      entities: [BlogPost, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BlogPost, User]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BlogController, AuthController],
  providers: [
    TypeOrmBlogPostRepository,
    TypeOrmUserRepository,
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AppModule {}
