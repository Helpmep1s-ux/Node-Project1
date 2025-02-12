import {Router} from "express";
import { deleteAllUsersController, getAllUsersController, getUserProfile, registerUserController, userLoginController } from "../controllers/user.controller.js"
import { authMiddleWare } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get('/',getAllUsersController)
userRouter.post('/register',registerUserController)
userRouter.post('/login',userLoginController);
userRouter.post('/delete',deleteAllUsersController);

userRouter.get('/:userId',authMiddleWare,getUserProfile);

export default userRouter;