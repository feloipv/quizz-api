import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth";
import connectDB from "./configs/database";
import errorHandler from "./middlewares/errorMiddlware";

dotenv.config();

const basePath: string = "/api/v1";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use(`${basePath}`, authRouter);

app.use(errorHandler);

connectDB();
export const viteNodeApp = app;
