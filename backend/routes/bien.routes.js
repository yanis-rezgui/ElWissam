import { Router } from "express";
import { getBien, getBiens } from "../controllers/biens.controller.js";


const biensRouter = new Router();

biensRouter.get('/', getBiens);

biensRouter.get('/:id', getBien)

export default biensRouter;