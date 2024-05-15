import { UserJson } from "../../../models";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Result, ResultDto } from "../../../shared/utils";
import { UserRepository } from "../repository";

const PREFIX_CACHE = "list-all-user";

export class ListAllUserUsecase {
  async execute(): Promise<ResultDto> {
    const userRepository = new UserRepository();
    const cacheRepository = new CacheRepository();

    const userCache = await cacheRepository.get<UserJson[]>(PREFIX_CACHE);

    let user: UserJson[] = [];

    if (!userCache) {
      const userDB = await userRepository.listUser();

      const user = userDB.map((user) => user.toJSON());

      await cacheRepository.set(PREFIX_CACHE, user);
    } else {
      user = userCache;
    }

    return Result.success(200, "Usuários cadastrados.", user);
  }
}
