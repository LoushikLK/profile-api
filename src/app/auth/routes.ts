import { Router } from "express";
import passport from "passport";
import envConfig from "../../configs/env.config";
import AuthService from "../../services/auth.service";
import Controllers from "./controllers";
import {
  validateChangePassword,
  validateEmailLogin,
  validateEmailRegistration,
  validateEmailVerify,
  validateForgotPassword,
  validateForgotPasswordOTPVerify,
  validateResendVerificationCode,
} from "./validations";

export default class AuthRouter extends AuthService {
  public router: Router;
  private controller: Controllers;

  constructor() {
    super();
    this.router = Router();
    this.controller = new Controllers();
    this.routes();
  }

  /**
   * @openapi
   * /api/v1/auth/email-register:
   *   post:
   *     summary: Register a new user
   *     description: >-
   *       This endpoint allows users to register a new account.
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: user email
   *                 example: 2Q6bO@example.com
   *               displayName:
   *                 type: string
   *                 description: user display name
   *                 example: Admin User
   *               password:
   *                 type: string
   *                 description: user password
   *                 example: Admin@123
   *               confirmPassword:
   *                 type: string
   *                 description: user confirm password
   *                 example: Admin@123
   *               countryCode:
   *                 type: string
   *                 description: user country code
   *                 example: 91
   *               phoneNumber:
   *                 type: string
   *                 description: user phone number
   *                 example: 9876543210
   *               gender:
   *                 type: string
   *                 enum: [MALE, FEMALE, OTHER]
   *                 description: user gender
   *                 example: MALE
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Registered
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Bad Request
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Not Found
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Internal Server Error
   *
   *
   */

  public routes() {
    this.router.post(
      "/email-register",
      validateEmailRegistration(),
      this.controller.register.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/login:
     *   post:
     *     summary: Login to the application
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 example: abc@123.com
     *               password:
     *                 type: string
     *                 example: Admin@123
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 token:
     *                   type: string
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required:
     *                 - success
     *                 - message
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: Bad Request
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required:
     *                 - success
     *                 - message
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: Internal Server Error
     */

    this.router.post(
      "/login",
      validateEmailLogin(),
      this.controller.userLogin.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/google/login:
     *   get:
     *     summary: Redirect URL for Google OAuth
     *     tags:
     *       - Auth
     *     responses:
     *       302:
     *         description: Redirect to Google OAuth login page
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required:
     *                 - success
     *                 - message
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: Bad Request
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required:
     *                 - success
     *                 - message
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: Internal Server Error
     */

    this.router.get(
      "/google/login",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    /**
     * @openapi
     * /api/v1/auth/google/callback:
     *   get:
     *     summary: Callback URL to get the token from Google OAuth
     *     tags:
     *       - Auth
     *     responses:
     *       302:
     *         description: Redirect to success URL with token as query param
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required:
     *                 - success
     *                 - message
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: Bad Request
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required:
     *                 - success
     *                 - message
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: Internal Server Error
     */

    this.router.get(
      "/google/callback",
      passport.authenticate("google", {
        scope: ["profile", "email"],
        failureRedirect: envConfig.LoginFailedCallbackURL,
      }),
      this.controller.createUserToken.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/change-password:
     *   post:
     *     summary: Change user password
     *     tags:
     *       - Auth
     *     description: Endpoint to change user password.
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *       - in: header
     *         name: Authorization
     *         description: Bearer token for authentication
     *         required: true
     *         schema:
     *           type: string
     *           format: bearerToken
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email address.
     *               password:
     *                 type: string
     *                 description: Current password.
     *               newPassword:
     *                 type: string
     *                 description: New password.
     *     responses:
     *       '200':
     *         description: Password changed successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the password change was successful.
     *                 message:
     *                   type: string
     *                   description: Message indicating the result of the operation.
     *             example:
     *               success: true
     *               message: Password changed successfully.
     *       '400':
     *         description: Invalid request body or parameters.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message describing the issue.
     *             example:
     *               message: Email is not valid.
     *       '401':
     *         description: Unauthorized. User not authenticated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating the unauthorized access.
     *             example:
     *               message: Unauthorized access.
     *       '403':
     *         description: Forbidden. User does not have permission to perform the action.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating the forbidden access.
     *             example:
     *               message: You do not have permission to change the password.
     */

    this.router.post(
      "/change-password",
      this.isAuthenticated,
      validateChangePassword(),
      this.controller.changePassword.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/resend-verification-code:
     *   post:
     *     summary: Resend verification code
     *     tags:
     *       - Auth
     *     description: Endpoint to resend verification code to a user's email.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email address to resend verification code.
     *     responses:
     *       '200':
     *         description: Verification code resent successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the verification code resend was successful.
     *                 message:
     *                   type: string
     *                   description: Message indicating the result of the operation.
     *             example:
     *               success: true
     *               message: Verification code resent successfully.
     *       '400':
     *         description: Invalid request body or parameters.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message describing the issue.
     *             example:
     *               message: Email is not valid.
     *       '401':
     *         description: Unauthorized. User not authenticated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating the unauthorized access.
     *             example:
     *               message: Unauthorized access.
     */

    this.router.post(
      "/resend-verification-code",
      validateResendVerificationCode(),
      this.controller.resendVerificationCode.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/verify:
     *   post:
     *     summary: Verify user account
     *     tags:
     *       - Auth
     *     description: Endpoint to verify a user account using a verification token.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               token:
     *                 type: string
     *                 description: Verification token received by the user.
     *     responses:
     *       '200':
     *         description: Account verified successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the account verification was successful.
     *                 message:
     *                   type: string
     *                   description: Message indicating the result of the operation.
     *             example:
     *               success: true
     *               message: Account verified successfully.
     *       '400':
     *         description: Invalid request body or parameters.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message describing the issue.
     *             example:
     *               message: Invalid or expired verification token.
     *       '401':
     *         description: Unauthorized. User not authenticated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating the unauthorized access.
     *             example:
     *               message: Unauthorized access.
     */

    this.router.post(
      "/verify",
      validateEmailVerify(),
      this.controller.verifyUser.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/forgot-password:
     *   post:
     *     summary: Forgot password
     *     tags:
     *       - Auth
     *     description: Endpoint to initiate the forgot password process. Sends an OTP to the user's email for password reset.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email address to send the OTP for password reset.
     *     responses:
     *       '200':
     *         description: OTP sent successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the OTP was sent successfully.
     *                 message:
     *                   type: string
     *                   description: Message indicating the result of the operation.
     *             example:
     *               success: true
     *               message: OTP sent successfully.
     *       '400':
     *         description: Invalid request body or parameters.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message describing the issue.
     *             example:
     *               message: Invalid email format.
     */

    this.router.post(
      "/forgot-password",
      validateForgotPassword(),
      this.controller.forgotPassword.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/forgot-password-verify:
     *   post:
     *     summary: Verify forgot password OTP
     *     tags:
     *        - Auth
     *     description: Endpoint to verify the OTP sent for password reset and set a new password.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               otp:
     *                 type: string
     *                 description: One-time password received by the user.
     *               newPassword:
     *                 type: string
     *                 description: New password to be set for the user's account.
     *               confirmPassword:
     *                 type: string
     *                 description: New password to be set for the user's account.
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email address.
     *     responses:
     *       '200':
     *         description: Password reset successful.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the password reset was successful.
     *                 message:
     *                   type: string
     *                   description: Message indicating the result of the operation.
     *             example:
     *               success: true
     *               message: Password reset successful.
     *       '400':
     *         description: Invalid request body or parameters.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message describing the issue.
     *             example:
     *               message: Invalid OTP or email format.
     *       '401':
     *         description: Unauthorized. User not authenticated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating the unauthorized access.
     *             example:
     *               message: Unauthorized access.
     */

    this.router.post(
      "/forgot-password-verify",
      validateForgotPasswordOTPVerify(),
      this.controller.forgotPasswordVerify.bind(this.controller)
    );

    /**
     * @openapi
     * /api/v1/auth/logout:
     *   post:
     *     summary: Logout user
     *     tags:
     *      - Auth
     *     description: Endpoint to logout a user by invalidating the bearer token.
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *       - in: header
     *         name: Authorization
     *         description: Bearer token for authentication
     *         required: true
     *         schema:
     *           type: string
     *           format: bearerToken
     *     responses:
     *       '200':
     *         description: User logged out successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the logout operation was successful.
     *                 message:
     *                   type: string
     *                   description: Message indicating the result of the operation.
     *             example:
     *               success: true
     *               message: User logged out successfully.
     *       '401':
     *         description: Unauthorized. User not authenticated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating the unauthorized access.
     *             example:
     *               message: Unauthorized access. Please login to continue.
     */

    this.router.post(
      "/logout",
      this.isAuthenticated,
      this.controller.logout.bind(this.controller)
    );
  }
}
