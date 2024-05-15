import { Result, ResultDto, bcrypt, jwt } from "../../../shared/utils";
import { LoginUserDto } from "../dtos";
import { UserRepository } from "../repository";

export class LoginUserUsecase {
  async execute(data: LoginUserDto): Promise<ResultDto> {
    const userRepository = new UserRepository();

    const userExists = await userRepository.verifyIfUserExistsByUsername(
      data.username
    );

    if (!userExists) return Result.error(404, "Usuário não encontrado.");

    const validatedPassword = await bcrypt.compareHash(
      data.password,
      userExists.toJsonWithPassword().password
    );

    if (!validatedPassword)
      return Result.error(404, "Usuário ou senha inválidos.");

    const dataUser = userExists.toJSON();
    const token = jwt.encoded(dataUser);

    return Result.success(200, "Usuário logado com sucesso.", {
      ...dataUser,
      token,
    });
  }
}
