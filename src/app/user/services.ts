import { NotFound } from "http-errors";
import { FilterQuery } from "mongoose";
import paginationHelper from "../../helpers/pagination.helper";
import { UserModel } from "../../schemas/user";
import { IUser } from "../../types/user";

export default class UserService {
  public async getUserData(
    userId: string,
    currentUserId?: string,
    role?: string
  ) {
    try {
      const user = await UserModel.findById(userId)
        .select(
          "-__v -createdAt -updatedAt -password -googleAccessToken -googleSecretToken -verificationInfo -token  -photoPath"
        )
        .lean();

      if (!user) throw new NotFound("User not found.");

      //check if user is private or not and check if current user has admin privilege

      if (
        currentUserId &&
        currentUserId !== userId &&
        role &&
        role !== "ADMIN" &&
        user?.isPrivateAccount
      )
        throw new NotFound("Cannot access private user.");

      return user;
    } catch (error) {
      throw error;
    }
  }
  public async allUserData({
    userId,
    role,
    pageNo,
    perPage,
    search,
  }: {
    userId: string;
    role: string;
    perPage?: number;
    pageNo?: number;
    search?: string;
  }) {
    try {
      let query: FilterQuery<IUser> = {
        _id: {
          $ne: userId,
        },
        isPrivateAccount: false,
      };

      if (role === "ADMIN") delete query.isPrivateAccount;
      if (search)
        query.$or = [
          {
            displayName: new RegExp(search, "i"),
          },
          {
            email: new RegExp(search, "i"),
          },
          {
            phoneNumber: new RegExp(search, "i"),
          },
        ];

      const userData = await paginationHelper({
        model: UserModel,
        query,
        pageNo,
        perPage,
        sort: { createdAt: -1 },
      });

      return userData;
    } catch (error) {
      throw error;
    }
  }
  public async updateUser(userId: string, userData: Partial<IUser>) {
    try {
      const user = await UserModel.findByIdAndUpdate(userId, {
        ...userData,
      });

      if (!user) throw new NotFound("User not found!");
    } catch (error) {
      throw error;
    }
  }
}
