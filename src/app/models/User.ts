import { UpdateCountDto } from "../features/user/dtos/update-count.dto";
import { Base } from "./Base";

export interface UserJson {
  id: string;
  username: string;
  count: number;
}

export class User extends Base {
  constructor(
    _id: string,
    private _username: string,
    private _password: string,
    private _count: number
  ) {
    super();
  }

  public toJSON(): UserJson {
    return {
      id: this._id,
      username: this._username,
      count: this._count,
    };
  }

  public toJsonWithPassword() {
    return {
      id: this._id,
      username: this._username,
      count: this._count,
      password: this._password,
    };
  }

  updateCount(data: Omit<UpdateCountDto, "username">): boolean {
    if (data.count) {
      this._count = data.count++;
    }
    return true;
  }
}
