import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { clientCommunes, createCommune, deleteCommune, getAllCommunes, updateCommune } from "../controllers/communes.controller.js";
import multer from "multer";


const communesRouter = new Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/avif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, AVIF, and WEBP are allowed."));
    }
  },
});

communesRouter.get('/', authorize, isAdmin, getAllCommunes);

communesRouter.get('/client', clientCommunes);

communesRouter.post('/', authorize, isAdmin, upload.single("image"), createCommune);

communesRouter.put('/:id', authorize, isAdmin, upload.single("image"), updateCommune);

communesRouter.delete('/:id', authorize, isAdmin, deleteCommune);


export default communesRouter;