import {Router} from "express";
import { deleteAllUsersController, getAllUsersController, registerUserController, userLoginController } from "../controllers/user.controller.js"

const userRouter = Router();

userRouter.get('/allUsers',getAllUsersController)
userRouter.post('/register',registerUserController)
userRouter.post('/login',userLoginController);
userRouter.post('/delete',deleteAllUsersController);

export default userRouter;