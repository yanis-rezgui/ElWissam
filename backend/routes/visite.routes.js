import {Router} from "express"

import addVisite from "../controllers/visite.controller.js";


const visiteRouter = new Router();

visiteRouter.post('/', addVisite);

export default visiteRouter;