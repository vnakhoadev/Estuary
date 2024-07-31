import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Post } from "./Post.entity"

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  text: string

  @ManyToOne(() => Post, (post) => post.comment)
  @JoinColumn()
  post: Post

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}