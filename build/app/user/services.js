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
const pagination_helper_1 = __importDefault(require("../../helpers/pagination.helper"));
const user_1 = require("../../schemas/user");
class UserService {
    getUserData(userId, currentUserId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.UserModel.findById(userId)
                    .select("-__v -createdAt -updatedAt -password -googleAccessToken -googleSecretToken -verificationInfo -token  -photoPath")
                    .lean();
                if (!user)
                    throw new http_errors_1.NotFound("User not found.");
                //check if user is private or not and check if current user has admin privilege
                if (currentUserId &&
                    currentUserId !== userId &&
                    role &&
                    role !== "ADMIN" &&
                    (user === null || user === void 0 ? void 0 : user.isPrivateAccount))
                    throw new http_errors_1.NotFound("Cannot access private user.");
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    allUserData({ userId, role, pageNo, perPage, search, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {
                    _id: {
                        $ne: userId,
                    },
                    isPrivateAccount: false,
                    role: "USER",
                };
                if (role === "ADMIN")
                    delete query.isPrivateAccount;
                if (!userId)
                    delete query._id;
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
                const userData = yield (0, pagination_helper_1.default)({
                    model: user_1.UserModel,
                    query,
                    pageNo,
                    perPage,
                    sort: { createdAt: -1 },
                    select: "-password -googleAccessToken -googleSecretToken -verificationInfo -token -photoPath -__v",
                });
                return userData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.UserModel.findByIdAndUpdate(userId, Object.assign({}, userData));
                if (!user)
                    throw new http_errors_1.NotFound("User not found!");
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserService;
