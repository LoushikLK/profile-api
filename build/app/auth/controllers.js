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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const env_config_1 = __importDefault(require("../../configs/env.config"));
const jwt_helper_1 = require("../../helpers/jwt.helper");
const mail_service_1 = require("../../services/mail.service");
const services_1 = __importDefault(require("../user/services"));
const services_2 = __importDefault(require("./services"));
class Controllers {
    constructor() {
        this.service = new services_2.default();
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get all the data from body
                const { displayName, email, gender, phoneNumber, countryCode, password } = req.body;
                //create a user
                const newUser = yield this.service.emailRegister({
                    displayName,
                    email,
                    gender,
                    phoneNumber,
                    countryCode,
                    rawPassword: password,
                });
                //send email to the user about account created and verification link
                yield (0, mail_service_1.sendEmail)({
                    to: newUser.email,
                    subject: "Verify Your Email",
                    text: `
        <h3 style="width:100%;text-align:center;" >Please verify your email by clicking on the link below.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="${env_config_1.default.AppBaseApiUrl}/verify-email?token=${newUser.token}" >Verify</a>
        `,
                });
                //send response to client
                res.json({
                    msg: "Verify your email.",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    resendVerificationCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get all the data from body
                const { email } = req.body;
                //check if user exist
                const user = yield this.service.checkUserExist(email);
                //if user exist check if verification code is expired
                if (!user)
                    throw new http_errors_1.NotFound("User not found.");
                //else create a new verification code
                const token = yield (0, jwt_helper_1.generateToken)({
                    email: user === null || user === void 0 ? void 0 : user.email,
                    displayName: user === null || user === void 0 ? void 0 : user.displayName,
                }, {
                    expiresIn: "5m",
                });
                //send email to the user about account created and verification link
                yield (0, mail_service_1.sendEmail)({
                    to: user === null || user === void 0 ? void 0 : user.email,
                    subject: "Verify Your Email",
                    text: `
        <h3 style="width:100%;text-align:center;" >Please verify your email by clicking on the link below.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="${env_config_1.default.AppBaseApiUrl}/verify-email/${token}" >Verify</a>
        `,
                });
                //send response to client
                res.json({
                    msg: "Verification email sent.",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get all the data from body
                const { token } = req.body;
                //verify email
                yield this.service.verifyEmailToken(token);
                //send response to client
                res.json({
                    msg: "Account verified successfully.",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    userLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get all the data from body
                const { email, password } = req.body;
                //check if the user exist
                const user = yield this.service.checkUserExist(email);
                //after user found call the authentication method on user schema to check and verify about password
                const authenticUser = user.authenticate(password);
                //if password is not match throw an error
                if (!authenticUser)
                    throw new http_errors_1.Unauthorized("Email or password is invalid.");
                //check is user is blocked or not
                if (user.blockStatus === "BLOCKED")
                    throw new http_errors_1.Unauthorized("Account is blocked.");
                //after that save the user
                yield user.save();
                //if user is valid return a token to user
                //create a token
                const token = yield (0, jwt_helper_1.generateToken)({
                    email: user === null || user === void 0 ? void 0 : user.email,
                    _id: user === null || user === void 0 ? void 0 : user._id,
                    displayName: user === null || user === void 0 ? void 0 : user.displayName,
                    role: user === null || user === void 0 ? void 0 : user.role,
                });
                //send response to client
                res.json({
                    msg: "Success",
                    success: true,
                    ACCESS_TOKEN: token,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get all the data from body
                const { password, newPassword } = req.body;
                //validate user is exist or not
                //change the password
                const user = yield this.service.verifyAndCreateNewPassword((_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a.email, password, newPassword);
                //send email to the user about account created and verification link
                yield (0, mail_service_1.sendEmail)({
                    to: user === null || user === void 0 ? void 0 : user.email,
                    subject: "Password Changed!",
                    text: `
        <h3 style="width:100%;text-align:center;" >Your password has been changed recently. If not done by you change your password immediately.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="${env_config_1.default.AppBaseApiUrl}/change-password >Change Password</a>
        `,
                });
                //send response to client
                res.json({
                    msg: "Password changed successfully.",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get all the data from body
                const { email } = req.body;
                //generate otp send to email
                const user = yield this.service.createOTPAndSave(email);
                //send email to the user about otp
                yield (0, mail_service_1.sendEmail)({
                    to: user.email,
                    subject: "One Time Password",
                    text: `
        <h3 style="width:100%;text-align:center;" >OTP to recover your account.</h3>
        <h1 style="width:100%;text-align:center;text:blue" >${user.verificationInfo.otp}</h1>
        
        `,
                });
                //send response to client
                res.json({
                    msg: "OTP sent.",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    forgotPasswordVerify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get all the data from body
                const { otp, newPassword, email } = req.body;
                //validate otp
                yield this.service.verifyOTPAndChangePassword({
                    email,
                    otp,
                    password: newPassword,
                });
                //send response to client
                res.json({
                    msg: "Password reset successful.",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    logout(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new services_1.default().updateUser((_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id, {
                    isOnline: false,
                });
                //send response to client
                res.json({
                    msg: "You have been logged out successfully.",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    createUserToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if user is authorized if not throws error
                if (!(req === null || req === void 0 ? void 0 : req.isAuthenticated()))
                    throw new http_errors_1.Unauthorized("Unauthorized.");
                //if user is not present throws an error
                if (!(req === null || req === void 0 ? void 0 : req.user))
                    throw new http_errors_1.Unauthorized("Not authorized.");
                //if user present create new token
                const userToken = yield this.service.generateUserToken(req === null || req === void 0 ? void 0 : req.user);
                //send token to the client
                res
                    .status(403)
                    .redirect(env_config_1.default.LoginSuccessCallbackURL + `?token=${userToken}`);
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
}
exports.default = Controllers;
