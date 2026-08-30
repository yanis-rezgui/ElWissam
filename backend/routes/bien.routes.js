import { Router } from "express";
import { getBien, getBiens, getBiensStats } from "../controllers/biens.controller.js";


const biensRouter = new Router();

biensRouter.get('/', getBiens);

biensRouter.get('/stats', getBiensStats);

biensRouter.get('/:id', getBien)


export default biensRouter; 