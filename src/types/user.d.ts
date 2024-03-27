import { Document } from "mongoose";

export interface IUser extends Document {
  displayName: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "NONE";
  phoneNumber: string;
  bio: string;
  countryCode: string;
  country: string;
  state: string;
  district: string;
  pinCode: string;
  address: string;
  password: string;
  isPrivateAccount: boolean;
  token: string;
  isOnline: boolean;
  verificationInfo: {
    otp: number;
    validity: number;
  };
  photoUrl: string;
  photoPath: string;
  role: "ADMIN" | "USER";
  blockStatus: "BLOCKED" | "UNBLOCKED";
  emailVerified: boolean;
  googleId: string;
  googleAccessToken: string;
  googleSecretToken: string;
  encryptPassword(rawPassword: string): string;
  authenticate(rawPassword: string): boolean;
}
