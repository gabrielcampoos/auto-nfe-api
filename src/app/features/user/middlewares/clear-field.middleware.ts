import { NextFunction, Request, Response } from "express";

export const clearField = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password } = request.body;

  request.body.username = username.trim();
  request.body.password = password.trim();

  next();
};
