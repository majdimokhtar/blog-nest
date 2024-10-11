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

  constructor(id: string, title: string, content: string, authorId: string) {
    this.id = id; // explicitly set id in the constructor for testing
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = new Date(); // initialize createdAt
    this.updatedAt = new Date(); // initialize updatedAt
  }

  updateContent(newContent: string) {
    this.content = newContent;
    this.updatedAt = new Date();
  }
}
