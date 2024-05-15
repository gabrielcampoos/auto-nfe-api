import { Base } from "./Base";

export interface UserJson {
  id: string;
  username: string;
}

export class User extends Base {
  constructor(
    _id: string,
    private _username: string,
    private _password: string
  ) {
    super();
  }

  public toJSON(): UserJson {
    return {
      id: this._id,
      username: this._username,
    };
  }

  public toJsonWithPassword() {
    return {
      id: this._id,
      username: this._username,
      password: this._password,
    };
  }
}
