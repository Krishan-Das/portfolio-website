import express from "express";
import {authenticate} from "../middlewares/authenticate.middleware.js";
import * as skillController from "../controllers/skill.controller.js";

const skillRouter = express.Router();


// --- create skill post ---
skillRouter.post('/create',authenticate, skillController.create);





export default skillRouter;