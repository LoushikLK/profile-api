import { NextFunction, Request, Response } from "express";
import UserService from "./services";

export default class UserController extends UserService {
  constructor() {
    super();
  }

  /**
   * getSelf
   *
   */

  public async getSelf(req: Request, res: Response, next: NextFunction) {
    try {
      // update the user with id
      const data = await this.getUserData(req?.currentUser?._id);

      //send response to client
      res.json({
        msg: "Success",
        success: true,
        data: { data },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getAllUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const { perPage, pageNo, search } = req?.query;

      // get all the user data
      const data = await this.allUserData({
        userId: req?.currentUser?._id,
        role: req?.currentUser?.role,
        perPage: perPage ? Number(perPage) : 10,
        pageNo: pageNo ? Number(pageNo) : 1,
        search: search ? String(search) : undefined,
      });

      //send response to client
      res.json({
        msg: "Success",
        success: true,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
  public async updateSelf(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        displayName,
        gender,
        phoneNumber,
        countryCode,
        country,
        state,
        district,
        pinCode,
        address,
        isOnline,
        photoUrl,
        isPrivateAccount,
        bio,
      } = req?.body;

      // handle hooks for different event
      await this.updateUser(req?.currentUser?._id, {
        displayName,
        gender,
        phoneNumber,
        countryCode,
        country,
        state,
        district,
        pinCode,
        address,
        isOnline,
        photoUrl,
        isPrivateAccount,
        bio,
      });

      //send response to client
      res.json({
        msg: "Success",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  public async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req?.params?.userId;

      const {
        displayName,
        gender,
        phoneNumber,
        countryCode,
        country,
        state,
        district,
        pinCode,
        address,
        isOnline,
        photoUrl,
        isPrivateAccount,
        blockStatus,
        emailVerified,
        bio,
      } = req?.body;

      // update the user with id
      await this.updateUser(userId, {
        displayName,
        gender,
        phoneNumber,
        countryCode,
        country,
        state,
        district,
        pinCode,
        address,
        isOnline,
        photoUrl,
        isPrivateAccount,
        blockStatus,
        emailVerified,
        bio,
      });

      //send response to client
      res.json({
        msg: "Success",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
