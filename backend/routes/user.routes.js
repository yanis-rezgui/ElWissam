import { Router } from "express";
import { getCurrentUser, updatePassword, updateUserInfo } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = new Router();

userRouter.get('/',authorize, getCurrentUser);

userRouter.put('/', authorize, updateUserInfo);

userRouter.put('/password', authorize, updatePassword)

export default userRouter;

