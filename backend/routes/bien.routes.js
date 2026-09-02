import { Router } from "express";
import { getBien, getBiens, getBiensStats } from "../controllers/biens.controller.js";
import multer from "multer"
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { addBien, deleteBien, updateBien } from "../controllers/biens.admin.controller.js";

const biensRouter = new Router();

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

biensRouter.get('/', getBiens);

biensRouter.get('/stats', getBiensStats);

biensRouter.get('/:id', getBien)

biensRouter.post('/:id', authorize, isAdmin, upload.array("images"), addBien);

biensRouter.put('/:id', authorize, isAdmin, upload.array("images"), updateBien);

biensRouter.delete('/:id', authorize, isAdmin,  deleteBien);


export default biensRouter; 