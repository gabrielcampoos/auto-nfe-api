import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import { CreateUserDto } from "../dtos";
import {
  CreateUserUsecase,
  GetUserUsecase,
  ListAllUserUsecase,
  LoginUserUsecase,
  UpdateCountUsecase,
} from "../usecases";

export class UserController {
  static async createUser(request: Request, response: Response) {
    const user: CreateUserDto = request.body;

    try {
      const usecase = new CreateUserUsecase();

      const result = await usecase.execute(user);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async loginUser(request: Request, response: Response) {
    const { username, password }: CreateUserDto = request.body;

    try {
      const usecase = new LoginUserUsecase();

      const result = await usecase.execute({ username, password });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listUser(request: Request, response: Response) {
    try {
      const usecase = new ListAllUserUsecase();

      const result = await usecase.execute();

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async getUser(request: Request, response: Response) {
    try {
      const { username } = request.user;

      const usecase = new GetUserUsecase();

      const result = await usecase.execute(username);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async updateCount(request: Request, response: Response) {
    const { username } = request.params;
    const { count } = request.body;
    try {
      const usecase = new UpdateCountUsecase();

      const result = await usecase.execute({
        username,
        newData: {
          count,
        },
      });

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }
}
