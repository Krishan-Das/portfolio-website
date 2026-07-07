import express from "express"
import * as projectController from "../controllers/project.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js";
import multer from "multer"

const projectRouter = express.Router();
const upload = multer({storage: multer.memoryStorage()})


projectRouter.post("/create", upload.single("image"), authenticate, projectController.createPost);

projectRouter.get("/fetch", authenticate, projectController.fetchPost);

projectRouter.patch("/update/:id", upload.single("image"), authenticate, projectController.updatePost);

projectRouter.delete("/delete/:id", authenticate, projectController.deletePost);

export default projectRouter;