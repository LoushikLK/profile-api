"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    role: {
        type: String,
        default: "USER",
    },
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
userSchema.methods.authenticate = function (rawPassword) {
    return this.encryptPassword(rawPassword) === this.password;
};
userSchema.methods.encryptPassword = function (rawPassword) {
    if (!rawPassword) {
        return "";
    }
    try {
        return (0, crypto_1.createHash)("sha256").update(rawPassword).digest("hex");
    }
    catch (error) {
        return "";
    }
};
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
