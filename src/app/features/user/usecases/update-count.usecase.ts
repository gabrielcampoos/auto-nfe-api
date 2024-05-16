import { Result, ResultDto } from "../../../shared/utils";
import { UpdateCountDto } from "../dtos/update-count.dto";
import { UserRepository } from "../repository";

interface ChangeData {
  username: string;
  newData: {
    count: number;
  };
}

export class UpdateCountUsecase {
  async execute(data: ChangeData): Promise<ResultDto> {
    const { username, newData } = data;

    const userRepository = new UserRepository();

    const user = await userRepository.verifyIfUserExistsByUsername(username);

    if (!user) return Result.error(400, "Usuário não encontrado.");

    const updated = user.updateCount({
      count: newData.count,
    });

    const countJson = user.toJSON();

    userRepository.updateCount({
      username,
      count: countJson.count,
    });

    return Result.success(200, "Usuário encontrado com sucesso.", user);
  }
}
