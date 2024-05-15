import { NextFunction, Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";

export const validateFieldNewUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password } = request.body;

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário username em formato string")
    );
  }

  if (!password || typeof password !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário senha em formato string")
    );
  }

  if (password.length < 6) {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "A senha deve conter pelo menos 6 caracteres.")
    );
  }
  return next();
};
