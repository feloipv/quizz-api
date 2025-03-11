import express from "express";
import { authControlllers } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", authControlllers.signup);
authRouter.post("/verify-otp", authControlllers.verifyOtp);

export default authRouter;
