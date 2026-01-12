import { BaseRepository } from "../core/abstracts/base.repository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { IUser, User } from "../models/User";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }
}
