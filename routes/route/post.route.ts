import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import { PostController } from "../../controller/post.controller";

const router = Router();

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    container.resolve(PostController).getPosts(req, res, next);
  }
);
router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    container.resolve(PostController).createPosts(req, res, next);
  }
);
router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    container.resolve(PostController).editPosts(req, res, next);
  }
);

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    container.resolve(PostController).deletePosts(req, res, next);
  }
);

export default router;