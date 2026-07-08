import express from "express"
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import skillRouter from "./routes/skill.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express();
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);


app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.use("/api/skill", skillRouter);


export default app;