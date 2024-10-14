import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BlogController } from './presentation/controllers/blog.controller';
import { AuthController } from './presentation/auth/auth.controller';
import { AppController } from './app.controller';
import { TypeOrmBlogPostRepository } from './infrastructure/repositories/typeorm-blog-post.repository';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { AuthService } from './application/auth/auth.service';
import { JwtAuthGuard } from './presentation/auth/jwt-auth.guard';
import { JwtStrategy } from './presentation/auth/jwt.strategy';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BlogController, AuthController, AppController],
  providers: [
    TypeOrmBlogPostRepository,
    TypeOrmUserRepository,
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    AppService,
  ],
})
export class AppModule {}
