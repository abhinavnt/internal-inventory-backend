import { BaseRepository } from "../core/abstracts/base.repository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { IUser, User } from "../models/User";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  create(data: Partial<IUser>): Promise<IUser> {
    return this.create(data);
  }

  findByPhoneOrEmail(field: keyof IUser, value: string): Promise<IUser | null> {
    return this.findOne({ [field]: value });
  }

  findByUserId(userId: string): Promise<IUser | null> {
    return this.findById(userId);
  }

  updateUser(userId: string, data: Partial<IUser>): Promise<IUser | null> {
    return this.findByIdAndUpdate(userId, data, { new: true });
  }
}
