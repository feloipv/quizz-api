import express from "express";
import { authControlllers } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", authControlllers.signup);

export default authRouter;
