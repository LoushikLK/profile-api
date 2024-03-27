import { NextFunction, Request, Response } from "express";
import { deleteFile, uploadFile } from "../../services/file.service";
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
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req?.params?.userId;

      // update the user with id
      const data = await this.getUserData(
        userId,
        req?.currentUser?._id,
        req?.currentUser?.role
      );

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
    let imageData;
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

      const userPhoto = req?.files?.image;

      if (userPhoto && !Array.isArray(userPhoto))
        imageData = await uploadFile(userPhoto.tempFilePath);

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
        photoUrl: imageData?.url
          ? imageData?.url
          : photoUrl
          ? photoUrl
          : undefined,
        photoPath: imageData?.path ? imageData?.path : undefined,
        isPrivateAccount,
        bio,
      });

      //send response to client
      res.json({
        msg: "Success",
        success: true,
      });
    } catch (error) {
      //handle error when uploading image
      if (imageData?.path) await deleteFile(imageData?.path);
      next(error);
    }
  }
  public async updateUserById(req: Request, res: Response, next: NextFunction) {
    let imageData;
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

      const userPhoto = req?.files?.image;

      if (userPhoto && !Array.isArray(userPhoto))
        imageData = await uploadFile(userPhoto.tempFilePath);

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
        photoUrl: imageData?.url
          ? imageData?.url
          : photoUrl
          ? photoUrl
          : undefined,
        photoPath: imageData?.path ? imageData?.path : undefined,
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
      if (imageData?.path) await deleteFile(imageData?.path);
      next(error);
    }
  }
}
