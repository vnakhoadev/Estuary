import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from 'tsyringe';
import { GetParamsPostDto, PostDto } from "../dtos/postDto";
import { PostService } from "../service/postService";

@autoInjectable()
export class PostController {
  constructor(private readonly postService: PostService) { }

  async getPosts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { limit, offset, ...rest } = req.query;

    const getParamsPostDto: GetParamsPostDto = plainToInstance(GetParamsPostDto, {
      ...rest,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });

    try {
      const { data, total } = await this.postService.getAll(getParamsPostDto);
      return res.json({ data, total });
    } catch (error) {
      next(error);
    }
  };

  async createPosts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {

    try {
      const createPostDtoData: PostDto = plainToInstance(PostDto, req.body);
      await this.postService.createPost(createPostDtoData);

      return res.json(req.body);
    } catch (error) {
      next(error);
    }
  }

  async editPosts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {

    try {
      const updateId: string = req.params.id;
      const updatePostDtoData: PostDto = plainToInstance(PostDto, req.body);

      const statusInfoupdate = await this.postService.updatePost(updateId, updatePostDtoData);

      return res.json(statusInfoupdate);
    } catch (error) {
      next(error);
    }
  }

  async deletePosts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {

    try {
      const deteteId: string = req.params.id;
      const statusInfoupdate = await this.postService.deletePost(deteteId);

      return res.json(statusInfoupdate);
    } catch (error) {
      next(error);
    }
  }


};