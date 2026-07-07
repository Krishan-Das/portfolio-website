import { Router } from "express";
import {
  registerUser, loginUser, getMe, refreshTokens, logoutUser, logoutAllUser,
  updateUser
} from "../controllers/auth.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js";
import multer from "multer"


const authRouter = Router()
const upload = multer({storage: multer.memoryStorage()})


// --- Register user ---
authRouter.post("/register", registerUser);

// --- Get me ---
authRouter.get("/me",authenticate, getMe);

// --- Login user ---
authRouter.post("/login", loginUser);

// --- Rotate tokens ---
authRouter.post("/refresh", refreshTokens);

// --- Logout user ---
authRouter.post("/logout",authenticate, logoutUser);

// --- Logout all users --- 
authRouter.post("/logout-all",authenticate, logoutAllUser);



// --- Update user details ---
authRouter.patch("/update", upload.single("avatar"), authenticate, updateUser);

export default authRouter;