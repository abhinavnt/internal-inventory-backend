import { IUser } from "../../../models/User";


export interface IUserRepository {
  create(data: Partial<IUser>): Promise<IUser>;
  findByPhoneOrEmail(field: keyof IUser, value: string): Promise<IUser | null>
  findByUserId(userId: string): Promise<IUser | null>;
  updateUser(userId: string, data: Partial<IUser>): Promise<IUser | null>
}