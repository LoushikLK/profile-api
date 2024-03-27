"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const core_helper_1 = require("../../helpers/core.helper");
const jwt_helper_1 = require("../../helpers/jwt.helper");
const user_1 = require("../../schemas/user");
class Service {
    constructor() {
        /**
         * email register
         */
        this.emailRegister = ({ displayName, email, gender, phoneNumber, countryCode, rawPassword, }) => __awaiter(this, void 0, void 0, function* () {
            //create a token for email verification
            const token = yield (0, jwt_helper_1.generateToken)({
                email,
                displayName,
            }, {
                expiresIn: 1000 * 60 * 5, //give 5min to user verification
            });
            return yield new user_1.UserModel({
                displayName,
                email,
                gender,
                phoneNumber,
                countryCode,
                rawPassword,
                token,
                role: "USER",
            }).save();
        });
        this.verifyEmailToken = (token) => __awaiter(this, void 0, void 0, function* () {
            //check if token is a valid token
            const verified = yield (0, jwt_helper_1.verifyToken)(token);
            if (!verified) {
                throw new http_errors_1.Unauthorized("Token is invalid. Try again");
            }
            //after token is verified update the user email as verified
            let userData = yield user_1.UserModel.findOneAndUpdate({
                email: verified === null || verified === void 0 ? void 0 : verified.email,
            }, {
                emailVerified: true,
            });
            if (!userData)
                throw new http_errors_1.BadRequest("User not found.");
            return true;
        });
        this.checkUserExist = (email) => __awaiter(this, void 0, void 0, function* () {
            //find user by email
            const userData = yield user_1.UserModel.findOne({
                email,
            });
            if (!userData)
                throw new http_errors_1.NotFound("User not found.");
            return userData;
        });
        this.verifyAndCreateNewPassword = (email, password, newPassword) => __awaiter(this, void 0, void 0, function* () {
            //find user by email
            const userData = yield user_1.UserModel.findOne({
                email,
            });
            if (!userData)
                throw new http_errors_1.NotFound("User not found.");
            //check if the password is correct
            const isAuthorized = userData.authenticate(password);
            //if incorrect password throws error
            if (!isAuthorized)
                throw new http_errors_1.Unauthorized("Unauthorized");
            //after that change the user password
            userData.password = newPassword;
            yield userData.save();
            return userData;
        });
        this.createOTPAndSave = (email) => __awaiter(this, void 0, void 0, function* () {
            //find user by email
            const userData = yield user_1.UserModel.findOne({
                email,
            });
            if (!userData)
                throw new http_errors_1.NotFound("User not found.");
            //create an otp
            const otp = (0, core_helper_1.createOTP)(6);
            //save otp to user collection
            userData.verificationInfo.otp = otp;
            userData.verificationInfo.validity = Date.now() + 1000 * 60 * 15; //added 15min for otp validation
            //save the code in database
            yield userData.save();
            return userData;
        });
        this.verifyOTPAndChangePassword = ({ email, otp, password, }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            //find user by email
            const userData = yield user_1.UserModel.findOne({
                email,
            });
            if (!userData)
                throw new http_errors_1.NotFound("User not found.");
            //verify otp with save otp
            if (otp !== ((_a = userData === null || userData === void 0 ? void 0 : userData.verificationInfo) === null || _a === void 0 ? void 0 : _a.otp))
                throw new http_errors_1.NotAcceptable("Entered OTP is not valid.");
            //check if time expire
            if (Date.now() > ((_b = userData === null || userData === void 0 ? void 0 : userData.verificationInfo) === null || _b === void 0 ? void 0 : _b.validity))
                throw new http_errors_1.NotAcceptable("OTP expired.");
            //if everything correct change password
            userData.rawPassword = password;
            //save the code in database
            yield userData.save();
            return true;
        });
        this.generateUserToken = (incomingUser) => __awaiter(this, void 0, void 0, function* () {
            //find user by email
            const user = yield user_1.UserModel.findOne({
                email: incomingUser === null || incomingUser === void 0 ? void 0 : incomingUser.email,
            });
            if (!user)
                throw new http_errors_1.NotFound("User not found.");
            const newToken = yield (0, jwt_helper_1.generateToken)({
                _id: user === null || user === void 0 ? void 0 : user._id,
                email: user === null || user === void 0 ? void 0 : user.email,
                role: user === null || user === void 0 ? void 0 : user.role,
            });
            return newToken;
        });
    }
}
exports.default = Service;
