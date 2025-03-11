import { NextFunction, Request, Response } from "express";
import User from "../../model/user";
import { ErrorResponse } from "../../middlewares/errorMiddlware";
import { createError } from "../../utils/errorUtils";
import { verifyOtpSchema } from "../../schemas/auth";

const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp } = req.body;
    let errResponse: ErrorResponse;

    const { error } = verifyOtpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      errResponse = createError(
        "Validation Error",
        400,
        error.details.map((err) => err.message)
      );
      return next(errResponse);
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ email }).select("+otp +otpExpiresAt");

    if (!user) {
      errResponse = createError("Người dùng không tồn tại", 400);
      return next(errResponse);
    }

    // Kiểm tra OTP có khớp không
    if (user.otp !== otp) {
      errResponse = createError("Mã OTP không hợp lệ", 400);
      return next(errResponse);
    }

    // Kiểm tra OTP có hết hạn không
    if (!user.otpExpiresAt || new Date() > new Date(user.otpExpiresAt)) {
      errResponse = createError("Mã OTP không hợp lệ hoặc đã hết hạn", 400);
      return next(errResponse);
    }

    await User.findOneAndUpdate(
      { email },
      { isActivate: true, otp: null, otpExpiresAt: null },
      { new: true }
    );

    res.json({ message: "Tài khoản đã được kích hoạt thành công" });
  } catch (error) {
    next(error);
  }
};

export default verifyOtp;
