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
const jwt_helper_1 = require("../helpers/jwt.helper");
class AuthService {
    /**
     * isAuthenticated middleware
     */
    isAuthenticated(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization)
                    throw new http_errors_1.Unauthorized("Unauthorized access. Please login to continue.");
                const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b[1];
                if (!token)
                    throw new http_errors_1.Unauthorized("Unauthorized access. Please login to continue.");
                // extract token from header
                const decoded = yield (0, jwt_helper_1.verifyToken)(token);
                req.currentUser = {
                    _id: decoded === null || decoded === void 0 ? void 0 : decoded._id,
                    email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
                    role: decoded === null || decoded === void 0 ? void 0 : decoded.role,
                };
                next();
            }
            catch (error) {
                const err = error;
                res.status(401).json({
                    success: false,
                    msg: err.message,
                });
            }
        });
    }
    isAdmin(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization)
                    throw new http_errors_1.Unauthorized("Unauthorized access. Please login to continue.");
                const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b[1];
                if (!token)
                    throw new http_errors_1.Unauthorized("Unauthorized access. Please login to continue.");
                // extract token from header
                const decoded = yield (0, jwt_helper_1.verifyToken)(token);
                req.currentUser = {
                    _id: decoded === null || decoded === void 0 ? void 0 : decoded._id,
                    email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
                    role: decoded === null || decoded === void 0 ? void 0 : decoded.role,
                };
                if ((decoded === null || decoded === void 0 ? void 0 : decoded.role) !== "ADMIN")
                    throw new http_errors_1.Unauthorized("Unauthorized access. Permission not granted.");
                next();
            }
            catch (error) {
                const err = error;
                res.status(401).json({
                    success: false,
                    msg: err.message,
                });
            }
        });
    }
    checkAuthentication(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")) === null || _c === void 0 ? void 0 : _c[1];
                if (token) {
                    // extract token from header
                    const decoded = yield (0, jwt_helper_1.verifyToken)(token);
                    req.currentUser = {
                        _id: decoded === null || decoded === void 0 ? void 0 : decoded._id,
                        email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
                        role: decoded === null || decoded === void 0 ? void 0 : decoded.role,
                    };
                    return next();
                }
                next();
            }
            catch (error) {
                const err = error;
                res.status(401).json({
                    success: false,
                    msg: err.message,
                });
            }
        });
    }
}
exports.default = AuthService;
