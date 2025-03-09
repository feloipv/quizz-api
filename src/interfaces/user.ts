import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  otp?: string;
  otpExpiresAt?: Date;
  isActive: boolean;
}

export interface AuthenticatedRequest extends Request {
  user_id?: string;
}
