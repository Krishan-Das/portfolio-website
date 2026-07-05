import express from "express"
import * as projectController from "../controllers/project.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js";
import multer from "multer"

const projectRouter = express.Router();
const upload = multer({storage: multer.memoryStorage()})


projectRouter.post("/create", upload.single("image"), authenticate, projectController.createPost);

export default projectRouter;