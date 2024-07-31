import { autoInjectable } from "tsyringe";
import { SelectQueryBuilder } from "typeorm";
import { Post } from "../database/entity/Post.entity";
import { GetParamsPostDto, PostDto, SortBy } from "../dtos/postDto";
import PostRepository from "../repositoty/PostRepository";



export interface ResponseMessage {
  status: number;
  message: string;
}

@autoInjectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) { }

  async getAll(params: GetParamsPostDto): Promise<{ data: Post[], total: number }> {

    const { limit, sortBy, offset, search } = params;

    const queryBuilder: SelectQueryBuilder<Post> = this.postRepository
      .createQueryBuilder('post')
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.createdAt"
      ]);

    const [result, total] = await queryBuilder
      .orderBy(
        'post.createdAt',
        sortBy === SortBy.ascending ? 'ASC' : 'DESC',
      )
      .take(limit || 5)
      .skip(offset || 0)
      .getManyAndCount();


    return {
      data: result,
      total
    };
  };

  async createPost(dataPost: PostDto): Promise<Post> {
    const post = this.postRepository.create(dataPost);
    return await this.postRepository.save(post);
  }

  async updatePost(updateId: string, dataUpdate: PostDto): Promise<ResponseMessage | void> {
    const post = await this.postRepository.findOneBy({ id: Number(updateId), })

    if (!post) throw new Error(`Post with postId ${updateId} not found`);

    await this.postRepository.update(Number(updateId), dataUpdate);

    return {
      status: 200,
      message: 'Update successfully',
    };
  }

  async deletePost(updateId: string): Promise<ResponseMessage | void> {
    const post = await this.postRepository.findOneBy({ id: Number(updateId), })

    if (!post) throw new Error(`Post with postId ${updateId} not found`);

    await this.postRepository.delete(Number(updateId));

    return {
      status: 200,
      message: 'Deleted successfully !',
    };
  }
}