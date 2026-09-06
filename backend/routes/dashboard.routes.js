import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { Router } from "express";

const dashboardRouter = new Router();

dashboardRouter.get('/', authorize, isAdmin, getDashboardStats);

export default dashboardRouter;