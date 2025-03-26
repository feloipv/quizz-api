import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth";
import connectDB from "./configs/database";
import errorHandler from "./middlewares/errorMiddlware";
import cookieParser from "cookie-parser";

dotenv.config();

const basePath: string = "/api/v1";
const MONGODB_URI: string = process.env.MONGODB_URI as string;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(`${basePath}`, authRouter);

app.use(errorHandler);

connectDB(MONGODB_URI);
app.listen(8080, () => console.log("Server chạy trên cổng 8080"));
