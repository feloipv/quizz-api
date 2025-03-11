import { NextFunction, Request, Response } from "express";
import { IUser } from "../../interfaces/user";
import { createError } from "../../utils/errorUtils";
import { ErrorResponse } from "../../middlewares/errorMiddlware";
import { signinSchema } from "../../schemas/auth";
import User from "../../model/user";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/jwtUtils";

const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as IUser;
    let errResponse: ErrorResponse;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      errResponse = createError(
        "Validate error",
        400,
        error.details.map((err) => err.message)
      );
      return next(errResponse);
    }
    const user: IUser | null = await User.findOne({ email, isActivate: true });
    if (!user) {
      errResponse = createError("User not found", 404);
      return next(errResponse);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errResponse = createError("Incorrect password", 401);
      return next(errResponse);
    }

    const access_token = generateToken(String(user._id), "15m");
    const refresh_token = generateToken(String(user._id), "1d");

    res.status(200).json({
      message: "Sigin success",
      data: {
        access_token,
        refresh_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default signin;
