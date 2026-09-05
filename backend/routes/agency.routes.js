import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { getAgencyInformation, updateAgency } from "../controllers/agency.controller.js";


export const agencyRouter = new Router();

agencyRouter.get('/',  getAgencyInformation);

agencyRouter.put('/', authorize, isAdmin, updateAgency);

export default agencyRouter;
