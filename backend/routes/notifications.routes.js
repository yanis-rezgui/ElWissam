import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { getAllNotifications, getNotificationsStats, markAllAsRead, markAsRead } from "../controllers/notifications.controller.js";
import { Router } from "express";



const notificationsRouter = new Router();

notificationsRouter.get('/', authorize, isAdmin, getAllNotifications);

notificationsRouter.put('/', authorize, isAdmin, markAllAsRead);

notificationsRouter.put('/:id', authorize, isAdmin, markAsRead);

notificationsRouter.get('/stats', authorize, isAdmin, getNotificationsStats);


export default notificationsRouter;