"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const controllers_1 = __importDefault(require("./controllers"));
const validations_1 = require("./validations");
class UserRouter extends auth_service_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.default();
        this.routes();
    }
    /**
     * Generates the routes for the API.
     *
     * @return {void} - Does not return anything.
     */
    routes() {
        /**
         * @openapi
         * /api/v1/user/self:
         *   get:
         *     summary: Get user profile
         *     tags:
         *      - User
         *     description: Endpoint to retrieve the profile of the authenticated user.
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       '200':
         *         description: User profile retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates if the profile retrieval was successful.
         *                 msg:
         *                   type: string
         *                   description: Message indicating the result of the operation.
         *                 data:
         *                   type: object
         *                   description: Object containing user profile data.
         *                   properties:
         *                     data:
         *                       type: object
         *                       description: User profile data.
         *             example:
         *               success: true
         *               msg: User profile retrieved successfully.
         *               data:
         *                 data:
         *                   displayName: John Doe
         *                   gender: male
         *                   phoneNumber: "+1234567890"
         *                   countryCode: "+1"
         *                   country: USA
         *                   state: California
         *                   district: San Francisco
         *                   pinCode: "12345"
         *                   address: 123 Main St
         *                   isOnline: true
         *                   photoUrl: "https://example.com/profile.jpg"
         *                   isPrivateAccount: false
         *                   bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
         *       '401':
         *         description: Unauthorized. User not authenticated.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates if the profile retrieval failed due to unauthorized access.
         *                 msg:
         *                   type: string
         *                   description: Error message indicating the unauthorized access.
         *             example:
         *               success: false
         *               msg: Unauthorized access. Please login to continue.
         */
        this.router.get("/self", this.isAuthenticated, this.controller.getSelf.bind(this.controller));
        /**
         * @openapi
         * /api/v1/user/self:
         *   patch:
         *     summary: Update user profile
         *     description: Endpoint to update user profile details.
         *     security:
         *       - bearerAuth: []
         *     tags:
         *       - User
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               displayName:
         *                 type: string
         *                 description: Display name of the user.
         *               gender:
         *                 type: string
         *                 enum: [male, female, other]
         *                 description: Gender of the user.
         *               phoneNumber:
         *                 type: string
         *                 description: Phone number of the user.
         *               countryCode:
         *                 type: string
         *                 description: Country code for the phone number.
         *               country:
         *                 type: string
         *                 description: Country of the user.
         *               state:
         *                 type: string
         *                 description: State of the user.
         *               district:
         *                 type: string
         *                 description: District of the user.
         *               pinCode:
         *                 type: string
         *                 description: Pin code of the user's address.
         *               address:
         *                 type: string
         *                 description: Address of the user.
         *               isOnline:
         *                 type: boolean
         *                 description: Indicates if the user is online.
         *               photoUrl:
         *                 type: string
         *                 description: URL of the user's profile photo.
         *               isPrivateAccount:
         *                 type: boolean
         *                 description: Indicates if the user's account is private.
         *               bio:
         *                 type: string
         *                 description: Biography of the user.
         *               image:
         *                 type: form-data
         *                 description: Profile image file.
         *     responses:
         *       '200':
         *         description: User profile updated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates if the profile update was successful.
         *                 msg:
         *                   type: string
         *                   description: Message indicating the result of the operation.
         *             example:
         *               success: true
         *               msg: User profile updated successfully.
         *       '400':
         *         description: Invalid request body or parameters.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 msg:
         *                   type: string
         *                   description: Error message describing the issue.
         *             example:
         *               msg: Invalid phone number format.
         *       '401':
         *         description: Unauthorized. User not authenticated.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 msg:
         *                   type: string
         *                   description: Error message indicating the unauthorized access.
         *             example:
         *               msg: Unauthorized access.
         */
        this.router.patch("/self", this.isAuthenticated, validations_1.UserValidation.validateSelfUpdate(), this.controller.updateSelf.bind(this.controller));
        /**
         * @openapi
         * /api/v1/user/{userId}:
         *   patch:
         *     summary: Update user profile by admin
         *     tags:
         *       - User
         *     description: Endpoint to update user profile details by an admin.
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: userId
         *         required: true
         *         schema:
         *           type: string
         *         description: ID of the user to update.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               displayName:
         *                 type: string
         *                 description: Display name of the user.
         *               gender:
         *                 type: string
         *                 enum: [male, female, other]
         *                 description: Gender of the user.
         *               phoneNumber:
         *                 type: string
         *                 description: Phone number of the user.
         *               countryCode:
         *                 type: string
         *                 description: Country code for the phone number.
         *               country:
         *                 type: string
         *                 description: Country of the user.
         *               state:
         *                 type: string
         *                 description: State of the user.
         *               district:
         *                 type: string
         *                 description: District of the user.
         *               pinCode:
         *                 type: string
         *                 description: Pin code of the user's address.
         *               address:
         *                 type: string
         *                 description: Address of the user.
         *               isOnline:
         *                 type: boolean
         *                 description: Indicates if the user is online.
         *               photoUrl:
         *                 type: string
         *                 description: URL of the user's profile photo.
         *               isPrivateAccount:
         *                 type: boolean
         *                 description: Indicates if the user's account is private.
         *               blockStatus:
         *                 type: boolean
         *                 description: Indicates if the user is blocked.
         *               emailVerified:
         *                 type: boolean
         *                 description: Indicates if the user's email is verified.
         *               bio:
         *                 type: string
         *                 description: Biography of the user.
         *               image:
         *                 type: form-data
         *                 description: Profile image file.
         *     responses:
         *       '200':
         *         description: User profile updated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates if the profile update was successful.
         *                 msg:
         *                   type: string
         *                   description: Message indicating the result of the operation.
         *             example:
         *               success: true
         *               msg: User profile updated successfully.
         *       '401':
         *         description: Unauthorized. User not authenticated or user does not have admin role.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates that the update failed due to unauthorized access.
         *                 msg:
         *                   type: string
         *                   description: Error message indicating the unauthorized access.
         *             example:
         *               success: false
         *               msg: Unauthorized access. Admin role required.
         */
        this.router.patch("/:userId", validations_1.UserValidation.validateUserById(), this.isAdmin, this.controller.updateUserById.bind(this.controller));
        /**
         * @openapi
         * /api/v1/user/{userId}:
         *   get:
         *     summary: Get user profile by userId
         *     tags:
         *      - User
         *     description: Endpoint to retrieve the profile of a user by userId.
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: userId
         *         required: true
         *         schema:
         *           type: string
         *         description: ID of the user to retrieve profile for.
         *     responses:
         *       '200':
         *         description: User profile retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates if the profile retrieval was successful.
         *                 msg:
         *                   type: string
         *                   description: Message indicating the result of the operation.
         *                 data:
         *                   type: object
         *                   description: Object containing user profile data.
         *                   properties:
         *                     data:
         *                       type: object
         *                       description: User profile data.
         *             example:
         *               success: true
         *               msg: User profile retrieved successfully.
         *               data:
         *                 data:
         *                   userId: "12345"
         *                   displayName: John Doe
         *                   gender: male
         *                   phoneNumber: "+1234567890"
         *                   countryCode: "+1"
         *                   country: USA
         *                   state: California
         *                   district: San Francisco
         *                   pinCode: "12345"
         *                   address: 123 Main St
         *                   isOnline: true
         *                   photoUrl: "https://example.com/profile.jpg"
         *                   isPrivateAccount: false
         *                   blockStatus: false
         *                   emailVerified: true
         *                   bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
         *       '401':
         *         description: Unauthorized. User not authenticated.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates if the profile retrieval failed due to unauthorized access.
         *                 msg:
         *                   type: string
         *                   description: Error message indicating the unauthorized access.
         *             example:
         *               success: false
         *               msg: Unauthorized access. Please login to continue.
         *       '404':
         *         description: User not found.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates that the user profile retrieval failed because the user was not found.
         *                 msg:
         *                   type: string
         *                   description: Error message indicating the user was not found.
         *             example:
         *               success: false
         *               msg: User not found.
         */
        this.router.get("/:userId", validations_1.UserValidation.validateGetUserById(), this.isAuthenticated, this.controller.getUserById.bind(this.controller));
        /**
         * @openapi
         * /api/v1/user:
         *   get:
         *     summary: Get all users
         *     tags:
         *       - User
         *     description: Endpoint to retrieve all user data.
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: query
         *         name: perPage
         *         schema:
         *           type: integer
         *         description: Number of items per page (optional).
         *       - in: query
         *         name: pageNo
         *         schema:
         *           type: integer
         *         description: Page number (optional).
         *       - in: query
         *         name: search
         *         schema:
         *           type: string
         *         description: Search query to filter users (optional).
         *     responses:
         *       '200':
         *         description: Users retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates if the users were retrieved successfully.
         *                 msg:
         *                   type: string
         *                   description: Message indicating the result of the operation.
         *                 data:
         *                   type: object
         *                   description: Object containing user data.
         *                   properties:
         *                     data:
         *                       type: array
         *                       description: Array containing user objects.
         *                       items:
         *                         type: object
         *                         description: User object.
         *                     perPage:
         *                       type: integer
         *                       description: Number of items per page.
         *                     pageNo:
         *                       type: integer
         *                       description: Current page number.
         *                     totalCount:
         *                       type: integer
         *                       description: Total count of users.
         *             example:
         *               success: true
         *               msg: Users retrieved successfully.
         *               data:
         *                 data:
         *                   - userId: "12345"
         *                     displayName: John Doe
         *                     gender: male
         *                     phoneNumber: "+1234567890"
         *                     countryCode: "+1"
         *                     country: USA
         *                     state: California
         *                     district: San Francisco
         *                     pinCode: "12345"
         *                     address: 123 Main St
         *                     isOnline: true
         *                     photoUrl: "https://example.com/profile.jpg"
         *                     isPrivateAccount: false
         *                     blockStatus: false
         *                     emailVerified: true
         *                     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
         *                 perPage: 10
         *                 pageNo: 1
         *                 totalCount: 100
         *       '401':
         *         description: Unauthorized. User not authenticated.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   description: Indicates that the users retrieval failed due to unauthorized access.
         *                 msg:
         *                   type: string
         *                   description: Error message indicating the unauthorized access.
         *             example:
         *               success: false
         *               msg: Unauthorized access. Please login to continue.
         */
        this.router.get("/", validations_1.UserValidation.validateGetAllUsers(), 
        // this.checkAuthentication,
        this.isAuthenticated, this.controller.getAllUserData.bind(this.controller));
    }
}
exports.default = UserRouter;
