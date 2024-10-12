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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // This loads environment variables globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [BlogPost, User],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([BlogPost, User]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BlogController, AuthController , AppController],
  providers: [
    TypeOrmBlogPostRepository,
    TypeOrmUserRepository,
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    AppService
  ],
})
export class AppModule {}
