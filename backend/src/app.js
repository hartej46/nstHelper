import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import healthRouter from "./routes/health.route.js"
import questionRouter from './routes/question.route.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
 
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/question',questionRouter);

export default app;
