import { BadRequest, NotAcceptable, NotFound, Unauthorized } from "http-errors";
import { createOTP } from "../../helpers/core.helper";
import { generateToken, verifyToken } from "../../helpers/jwt.helper";
import { UserModel } from "../../schemas/user";
import { IUser } from "../../types/user";

export default class Service {
  /**
   * email register
   */
  public emailRegister = async ({
    displayName,
    email,
    gender,
    phoneNumber,
    countryCode,
    rawPassword,
  }: {
    displayName: string;
    email: string;
    gender: string;
    phoneNumber: string;
    countryCode: string;
    rawPassword: string;
  }) => {
    //create a token for email verification
    const token = await generateToken(
      {
        email,
        displayName,
      },
      {
        expiresIn: 1000 * 60 * 5, //give 5min to user verification
      }
    );

    return await new UserModel({
      displayName,
      email,
      gender,
      phoneNumber,
      countryCode,
      rawPassword,
      token,
      role: "ADMIN",
    }).save();
  };
  public verifyEmailToken = async (token: string) => {
    //check if token is a valid token
    const verified: any = await verifyToken(token);

    if (!verified) {
      throw new Unauthorized("Token is invalid. Try again");
    }

    //after token is verified update the user email as verified

    let userData = await UserModel.findOneAndUpdate(
      {
        email: verified?.email,
      },
      {
        emailVerified: true,
      }
    );

    if (!userData) throw new BadRequest("User not found.");

    return true;
  };
  public checkUserExist = async (email: string) => {
    //find user by email
    const userData = await UserModel.findOne({
      email,
    });

    if (!userData) throw new NotFound("User not found.");

    return userData;
  };
  public verifyAndCreateNewPassword = async (
    email: string,
    password: string,
    newPassword: string
  ) => {
    //find user by email
    const userData = await UserModel.findOne({
      email,
    });

    if (!userData) throw new NotFound("User not found.");

    //check if the password is correct
    const isAuthorized = userData.authenticate(password);

    //if incorrect password throws error
    if (!isAuthorized) throw new Unauthorized("Unauthorized");

    //after that change the user password
    userData.password = newPassword;

    await userData.save();
    return userData;
  };
  public createOTPAndSave = async (email: string) => {
    //find user by email
    const userData = await UserModel.findOne({
      email,
    });

    if (!userData) throw new NotFound("User not found.");

    //create an otp
    const otp = createOTP(6);

    //save otp to user collection

    userData.verificationInfo.otp = otp;
    userData.verificationInfo.validity = Date.now() + 1000 * 60 * 15; //added 15min for otp validation

    //save the code in database
    await userData.save();
    return userData;
  };
  public verifyOTPAndChangePassword = async ({
    email,
    otp,
    password,
  }: {
    email: string;
    otp: number;
    password: string;
  }) => {
    //find user by email
    const userData: (IUser & { rawPassword: string }) | null =
      await UserModel.findOne({
        email,
      });

    if (!userData) throw new NotFound("User not found.");

    //verify otp with save otp
    if (otp !== userData?.verificationInfo?.otp)
      throw new NotAcceptable("Entered OTP is not valid.");

    //check if time expire
    if (Date.now() > userData?.verificationInfo?.validity)
      throw new NotAcceptable("OTP expired.");

    //if everything correct change password
    userData.rawPassword = password;

    //save the code in database
    await userData.save();
    return true;
  };
  public generateUserToken = async (incomingUser: Partial<IUser>) => {
    //find user by email
    const user = await UserModel.findOne({
      email: incomingUser?.email,
    });

    if (!user) throw new NotFound("User not found.");

    const newToken = await generateToken({
      _id: user?._id,
      email: user?.email,
      role: user?.role,
    });
    return newToken;
  };
}
