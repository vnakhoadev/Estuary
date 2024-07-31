import { Router } from "express";
import postRoutes from "./route/post.route";
import commentRoutes from "./route/comment.route";

const router = Router();

router.use('/posts', postRoutes);
router.use('/comment', commentRoutes);

export default router;