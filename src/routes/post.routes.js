import {Router} from "express";
import { createPost, deletePostbyId, getAllPosts, getPostByIdController, getPostByUserId, updatePostController } from "../controllers/post.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const postRouter = Router();

postRouter.route('/')
    .get(authMiddleWare ,getAllPosts)
    .post(authMiddleWare ,createPost);

postRouter.route('/:postId')
    .get(authMiddleWare ,getPostByIdController)
    .patch(authMiddleWare ,updatePostController)
    .delete(authMiddleWare ,deletePostbyId);

postRouter.get('/user/:userId',getPostByUserId);

export default postRouter;