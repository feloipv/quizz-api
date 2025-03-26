import express from "express";
import { authControlllers } from "../controllers/auth";
import { Response, NextFunction, Request } from "express";

const authRouter = express.Router();

authRouter.post("/signup", authControlllers.signup);
authRouter.post("/signin", authControlllers.signin);
authRouter.post("/verify-otp", authControlllers.verifyOtp);
authRouter.get("/me", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.cookies);
  } catch (error) {
    next(error);
  }
  res.json({ message: "okeeeeeeee" });
});

export default authRouter;
