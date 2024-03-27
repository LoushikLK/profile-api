import { NextFunction, Request, Response } from "express";
import { body, param, query, ValidationChain } from "express-validator";
import { formValidatorHelper } from "../../helpers/formValidation.helper";

const validateSelfUpdate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("provide a valid email."),
      body("displayName")
        .optional()
        .isString()
        .withMessage("provide a valid email."),
      body("gender")
        .optional()
        .isIn(["MALE", "FEMALE", "OTHER", "NONE"])
        .withMessage("gender value must be one of MALE,FEMALE,OTHER,NONE."),
      body("phoneNumber")
        .optional()
        .isMobilePhone("en-IN")
        .withMessage("enter a valid mobile number."),
      body("countryCode")
        .optional()
        .isNumeric()
        .withMessage("enter a valid country code."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateUserById = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("userId")
        .notEmpty()
        .withMessage("user id is required.")
        .isMongoId()
        .withMessage("provide a valid user id."),
      body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("provide a valid email."),
      body("displayName")
        .optional()
        .isString()
        .withMessage("provide a valid email."),
      body("gender")
        .optional()
        .isIn(["MALE", "FEMALE", "OTHER", "NONE"])
        .withMessage("gender value must be one of MALE,FEMALE,OTHER,NONE."),
      body("phoneNumber")
        .optional()
        .isMobilePhone("en-IN")
        .withMessage("enter a valid mobile number."),
      body("countryCode")
        .optional()
        .isNumeric()
        .withMessage("enter a valid country code."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateGetUserById = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("userId")
        .notEmpty()
        .withMessage("user id is required.")
        .isMongoId()
        .withMessage("provide a valid user id."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateGetAllUsers = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      query("perPage")
        .optional()
        .isNumeric()
        .withMessage("perPage must be a number."),
      query("pageNo")
        .optional()
        .isNumeric()
        .withMessage("pageNo must be a number."),
      query("search")
        .optional()
        .isString()
        .withMessage("search must be a string."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};

export const UserValidation = {
  validateSelfUpdate,
  validateUserById,
  validateGetUserById,
  validateGetAllUsers,
};
