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
const file_service_1 = require("../../services/file.service");
const services_1 = __importDefault(require("./services"));
class UserController extends services_1.default {
    constructor() {
        super();
    }
    /**
     * getSelf
     *
     */
    getSelf(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req === null || req === void 0 ? void 0 : req.currentUser);
                // update the user with id
                const data = yield this.getUserData((_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id);
                //send response to client
                res.json({
                    msg: "Success",
                    success: true,
                    data: { data },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserById(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
                // update the user with id
                const data = yield this.getUserData(userId, (_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id, (_c = req === null || req === void 0 ? void 0 : req.currentUser) === null || _c === void 0 ? void 0 : _c.role);
                //send response to client
                res.json({
                    msg: "Success",
                    success: true,
                    data: { data },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllUserData(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { perPage, pageNo, search } = req === null || req === void 0 ? void 0 : req.query;
                // get all the user data
                const data = yield this.allUserData({
                    userId: (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                    role: (_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b.role,
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
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateSelf(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let imageData;
            try {
                const { displayName, gender, phoneNumber, countryCode, country, state, district, pinCode, address, isOnline, photoUrl, isPrivateAccount, bio, } = req === null || req === void 0 ? void 0 : req.body;
                const userPhoto = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
                if (userPhoto && !Array.isArray(userPhoto))
                    imageData = yield (0, file_service_1.uploadFile)(userPhoto.tempFilePath);
                // handle hooks for different event
                yield this.updateUser((_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id, {
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
                    photoUrl: (imageData === null || imageData === void 0 ? void 0 : imageData.url)
                        ? imageData === null || imageData === void 0 ? void 0 : imageData.url
                        : photoUrl
                            ? photoUrl
                            : undefined,
                    photoPath: (imageData === null || imageData === void 0 ? void 0 : imageData.path) ? imageData === null || imageData === void 0 ? void 0 : imageData.path : undefined,
                    isPrivateAccount,
                    bio,
                });
                //send response to client
                res.json({
                    msg: "Success",
                    success: true,
                });
            }
            catch (error) {
                //handle error when uploading image
                if (imageData === null || imageData === void 0 ? void 0 : imageData.path)
                    yield (0, file_service_1.deleteFile)(imageData === null || imageData === void 0 ? void 0 : imageData.path);
                next(error);
            }
        });
    }
    updateUserById(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let imageData;
            try {
                const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
                const { displayName, gender, phoneNumber, countryCode, country, state, district, pinCode, address, isOnline, photoUrl, isPrivateAccount, blockStatus, emailVerified, bio, } = req === null || req === void 0 ? void 0 : req.body;
                const userPhoto = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image;
                if (userPhoto && !Array.isArray(userPhoto))
                    imageData = yield (0, file_service_1.uploadFile)(userPhoto.tempFilePath);
                // update the user with id
                yield this.updateUser(userId, {
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
                    photoUrl: (imageData === null || imageData === void 0 ? void 0 : imageData.url)
                        ? imageData === null || imageData === void 0 ? void 0 : imageData.url
                        : photoUrl
                            ? photoUrl
                            : undefined,
                    photoPath: (imageData === null || imageData === void 0 ? void 0 : imageData.path) ? imageData === null || imageData === void 0 ? void 0 : imageData.path : undefined,
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
            }
            catch (error) {
                if (imageData === null || imageData === void 0 ? void 0 : imageData.path)
                    yield (0, file_service_1.deleteFile)(imageData === null || imageData === void 0 ? void 0 : imageData.path);
                next(error);
            }
        });
    }
}
exports.default = UserController;
