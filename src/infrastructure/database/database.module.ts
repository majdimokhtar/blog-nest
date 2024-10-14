import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogPost } from '../../domain/blog-post.entity';
import { User } from '../../domain/user.entity';

@Module({
  imports: [
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
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
