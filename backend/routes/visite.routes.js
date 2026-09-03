import {Router} from "express"
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import {addVisite,  deleteAllAnnulee,  deleteAllTerminee,  deleteVisite,  getVisits, getVisitsStats, modifyStatus } from "../controllers/visite.controller.js";


const visiteRouter = new Router();

visiteRouter.post('/', addVisite);

visiteRouter.get('/', authorize, isAdmin, getVisits);

visiteRouter.get(
    '/stats',
    authorize,
    isAdmin,
    getVisitsStats
);

visiteRouter.put('/:id', authorize, isAdmin, modifyStatus);

visiteRouter.delete('/:id', authorize, isAdmin, deleteVisite);

visiteRouter.delete('/terminee', authorize, isAdmin, deleteAllTerminee);

visiteRouter.delete('/annulee', authorize, isAdmin, deleteAllAnnulee);

visiteRouter.get(
    '/stats',
    authorize,
    isAdmin,
    getVisitsStats
);

export default visiteRouter;