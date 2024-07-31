import { AppDataSource } from '../data-source/data-source';
import { Post } from '../database/entity/Post.entity';
import { Repository } from 'typeorm';

class PostRepository extends Repository<Post> {
  constructor() {
    super(Post, AppDataSource.manager);
  }
}

export default PostRepository;