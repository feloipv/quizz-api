import { ErrorResponse } from "../middlewares/errorMiddlware";

export const createError = (
  message: string,
  statusCode?: number,
  errors?: string[]
): ErrorResponse => {
  const err: ErrorResponse = new Error(message) as ErrorResponse;
  err.statusCode = statusCode;
  err.errors = errors;
  return err;
};
