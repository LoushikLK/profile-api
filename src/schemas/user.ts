import { createHash } from "crypto";
import { Model, Schema, model } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema<IUser, Model<IUser>>({
  displayName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  gender: String,
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  bio: String,
  countryCode: String,
  country: String,
  state: String,
  district: String,
  pinCode: String,
  address: String,
  password: String,
  token: String,
  isOnline: {
    type: Boolean,
    default: false,
  },
  verificationInfo: {
    otp: {
      type: Number,
    },
    validity: {
      type: Number,
    },
  },
  photoUrl: String,
  photoPath: String,
  role: String,
  isPrivateAccount: {
    type: Boolean,
    default: false,
  },
  blockStatus: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  googleId: String,
  googleAccessToken: String,
  googleSecretToken: String,
});

userSchema
  .virtual("rawPassword")
  .set(function (rawPassword) {
    this.password = this.encryptPassword(rawPassword);
  })
  .get(function () {
    return this.password;
  });

userSchema.methods.authenticate = function (rawPassword: string) {
  return this.encryptPassword(rawPassword) === this.password;
};
userSchema.methods.encryptPassword = function (rawPassword: string) {
  if (!rawPassword) {
    return "";
  }
  try {
    return createHash("sha256").update(rawPassword).digest("hex");
  } catch (error) {
    return "";
  }
};

export const UserModel = model<IUser, Model<IUser>>("User", userSchema);
