import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { forgotPassword, resetPassword } from "../controllers/forgotPassword.controller.js";
import { loginLimiter, passwordLimiter, signUpLimiter } from "../middlewares/authRateLimiter.js";


const authRouter = new Router();

authRouter.post('/sign-in', loginLimiter, signIn);

authRouter.post('/sign-up', signUpLimiter, signUp);

authRouter.post('/sign-out', signOut);

authRouter.post('/forgot-password', passwordLimiter, forgotPassword);

authRouter.post('/reset-password', passwordLimiter, resetPassword);

export default authRouter;