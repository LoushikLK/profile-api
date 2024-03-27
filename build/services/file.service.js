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
exports.deleteFile = exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const env_config_1 = __importDefault(require("../configs/env.config"));
cloudinary_1.v2.config({
    cloud_name: env_config_1.default.CloudinaryCloudName,
    api_key: env_config_1.default.CloudinaryApiKey,
    api_secret: env_config_1.default.CloudinaryApiSecret,
});
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file, {
            access_mode: "public",
            folder: "assets/profile",
        }, (err, result) => {
            if (err)
                reject(err);
            if (result)
                resolve({
                    url: result.url,
                    path: result === null || result === void 0 ? void 0 : result.public_id,
                });
        });
    });
});
exports.uploadFile = uploadFile;
const deleteFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.destroy(path, {
            invalidate: true,
        }, (err, result) => {
            if (err)
                reject(err);
            if (result)
                resolve(true);
        });
    });
});
exports.deleteFile = deleteFile;
