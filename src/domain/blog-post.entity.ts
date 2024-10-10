// export class BlogPost {
//   constructor(
//     public readonly id: string,
//     public title: string,
//     public content: string,
//     public authorId: string,
//     public createdAt: Date,
//     public updatedAt: Date,
//   ) {}

//   updateContent(newContent: string) {
//     this.content = newContent;
//     this.updatedAt = new Date();
//   }
// }

// export class BlogPost {
//   constructor(
//     public readonly id: string,
//     public title: string,
//     public content: string,
//     public authorId: string,
//     public createdAt: Date,
//     public updatedAt: Date,
//   ) {}

//   updateContent(newContent: string) {
//     this.content = newContent;
//     this.updatedAt = new Date();
//   }
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(title: string, content: string, authorId: string) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }

  updateContent(newContent: string) {
    this.content = newContent;
    this.updatedAt = new Date();
  }
}
