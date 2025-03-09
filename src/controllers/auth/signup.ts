import User from "../../model/user";
import { IUser, AuthenticatedRequest } from "../../interfaces/user";
import { signupSchema } from "../../schemas/auth";
import { Response, NextFunction } from "express";
import { createError } from "../../utils/errorUtils";
import { generateOTP } from "../../utils/generateOTP";
import { ErrorResponse } from "../../middlewares/errorMiddlware";
import sendEmail from "../../configs/mailer";
import ms from "ms";

const signup = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email } = req.body as IUser;
  const otp = generateOTP();

  let errResponse: ErrorResponse;

  let duplicate_err_message: string[] = [];

  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      errResponse = createError(
        "Validation Error",
        400,
        error.details.map((err) => err.message)
      );
      return next(errResponse);
    }

    const userExists = await User.findOne({ $or: [{ name }, { email }] });
    if (userExists) {
      if (userExists.name === name) {
        duplicate_err_message.push("Username has existed");
      }
      if (userExists.email === email) {
        duplicate_err_message.push("Email has existed");
      }
    }
    if (duplicate_err_message.length) {
      errResponse = createError("Duplicate", 400, duplicate_err_message);
      return next(errResponse);
    }

    await User.create({
      ...req.body,
      confirmPassword: undefined,
      otp,
      otpExpiresAt: new Date(Date.now() + ms("5m")),
    } as IUser);

    await sendEmail(email, otp);

    res.status(200).json({
      message: "Please check your email to activate your account",
    });
  } catch (error) {
    next(error);
  }
};

export default signup;
