import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { addUser, deleteUser, getAllUsers, updateUser } from "../controllers/users.controller.js";


const usersRouter = new Router();

usersRouter.get('/', authorize, isAdmin, getAllUsers);

usersRouter.put('/:id', authorize, isAdmin, updateUser);

usersRouter.post('/', authorize, isAdmin, addUser);

usersRouter.delete('/:id', authorize, isAdmin, deleteUser);


export default usersRouter;

