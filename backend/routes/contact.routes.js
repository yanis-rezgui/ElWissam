import { Router } from "express";
import contactUs from "../controllers/contact.controller.js";
import contactRateLimiter from "../middlewares/contactRateLimiter.js";


const contactRouter = new Router();

contactRouter.post('/',contactRateLimiter, contactUs);


export default contactRouter;