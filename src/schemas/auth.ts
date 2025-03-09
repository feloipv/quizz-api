import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  avatar: Joi.string().default(""),
  otp: Joi.string().length(6).optional(),
  otpExpiresAt: Joi.date().optional(),
  isActive: Joi.boolean().default(false),
});

export const signupSchema = Joi.object({
  name: userSchema.extract("name"),
  email: userSchema.extract("email"),
  password: userSchema.extract("password"),
  confirmPassword: userSchema.extract("confirmPassword"),
});

export const loginSchema = Joi.object({
  email: userSchema.extract("email"),
  password: userSchema.extract("password"),
});

export default userSchema;
