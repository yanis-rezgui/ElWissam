import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { toggleFavorites } from "../controllers/favorites.controller.js";


const favorisRouter = new Router();

favorisRouter.post('/:id', authorize, toggleFavorites);


export default favorisRouter;