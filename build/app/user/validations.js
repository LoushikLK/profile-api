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
exports.UserValidation = void 0;
const express_validator_1 = require("express-validator");
const formValidation_helper_1 = require("../../helpers/formValidation.helper");
const validateSelfUpdate = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("email")
                .optional()
                .trim()
                .isEmail()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("displayName")
                .optional()
                .isString()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("gender")
                .optional()
                .isIn(["MALE", "FEMALE", "OTHER", "NONE"])
                .withMessage("gender value must be one of MALE,FEMALE,OTHER,NONE."),
            (0, express_validator_1.body)("phoneNumber")
                .optional()
                .isMobilePhone("en-IN")
                .withMessage("enter a valid mobile number."),
            (0, express_validator_1.body)("countryCode")
                .optional()
                .isNumeric()
                .withMessage("enter a valid country code."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
const validateUserById = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.param)("userId")
                .notEmpty()
                .withMessage("user id is required.")
                .isMongoId()
                .withMessage("provide a valid user id."),
            (0, express_validator_1.body)("email")
                .optional()
                .trim()
                .isEmail()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("displayName")
                .optional()
                .isString()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("gender")
                .optional()
                .isIn(["MALE", "FEMALE", "OTHER", "NONE"])
                .withMessage("gender value must be one of MALE,FEMALE,OTHER,NONE."),
            (0, express_validator_1.body)("phoneNumber")
                .optional()
                .isMobilePhone("en-IN")
                .withMessage("enter a valid mobile number."),
            (0, express_validator_1.body)("countryCode")
                .optional()
                .isNumeric()
                .withMessage("enter a valid country code."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
const validateGetUserById = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.param)("userId")
                .notEmpty()
                .withMessage("user id is required.")
                .isMongoId()
                .withMessage("provide a valid user id."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
const validateGetAllUsers = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.query)("perPage")
                .optional()
                .isNumeric()
                .withMessage("perPage must be a number."),
            (0, express_validator_1.query)("pageNo")
                .optional()
                .isNumeric()
                .withMessage("pageNo must be a number."),
            (0, express_validator_1.query)("search")
                .optional()
                .isString()
                .withMessage("search must be a string."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.UserValidation = {
    validateSelfUpdate,
    validateUserById,
    validateGetUserById,
    validateGetAllUsers,
};
