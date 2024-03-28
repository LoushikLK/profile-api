# Enhanced Authentication API

This project involves the enhancement of an existing backend API for an authentication system to incorporate a new feature allowing users to set their profiles as public or private. Additionally, it implements functionality enabling admin users to view both public and private user profiles, while normal users can only access public profiles. The backend is developed using Node.js.

## Features

- Registration of new accounts
- Login functionality
- Social login integration with Google.
- Logout functionality
- Viewing of profile details
- Editing profile details including photo, name, bio, phone, email, and password
- Uploading a new photo or providing an image URL
- Setting profile as public or private
- Access control for admin and normal users
- Error handling, validation, and security measures

## Tech Stack

**Server:** Node.js, Express.js, MongoDB (for storing user data), Passport.js (for authentication), JWT (JSON Web Tokens)

**Deployment:** Vercel

## Run Locally

Clone the project

```bash
git clone https://github.com/LoushikLK/profile-api.git
```

Navigate to the project directory

```bash
cd profile-api
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

## Endpoints

- `POST /api/v1/auth/email-register`: Register a new account
- `POST /api/v1/auth/login`: User login
- `GET /api/v1/auth/login/google` Login or register with Google
- `GET /api/v1/auth/login/callback` Google callback url
- `POST /api/v1/auth/change-password`: Change Password url
- `POST /api/v1/auth/resend-verification-code`: Resend verification code
- `POST /api/v1/auth/verify`: Verify user email
- `POST /api/v1/auth/forgot-password`: Forgot password url
- `POST /api/v1/auth/forgot-password-verify`:Forgot Password verify otp url
- `POST /api/v1/auth/logout`: User logout url
- `GET /api/v1/user/self`: Get self user details
- `PATCH /api/v1/user/self`: Update self user details
- `PATCH /api/v1/user/:userId`: Update user details by id (Admin)
- `GET /api/v1/user/:userId`: Get user details by id
- `GET /api/v1/user`: Get all public user (get all user public/private by admin)

## Environment Variables

Ensure to set up the following environment variables:

- `MONGODB_URI`: URI for MongoDB database
- `GOOGLE_CLIENT_ID` : Google Client Id
- `GOOGLE_CLIENT_SECRET`: Google client secret
- `GOOGLE_REGISTER_CALLBACK_URL`: Register callback url
- `LOGIN_SUCCESS_CALLBACK_URL` : Login success callback url
- `LOGIN_FAIL_CALLBACK_URL`: Login fail callback url
- `PORT`: Server PORT
- `JWT_SECRET`: JWT secret key
- `SERVICE_EMAIL`: Service Email
- `EMAIL_SERVICE_PASSWORD` : Email service password
- `PASSPORT_SESSION_SECRET`: Passport session secret
- `APP_NAME` : APP NAME
- `EMAIL` : APP Email

- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET` : Cloudinary api secret
- `API_BASE_URL` : Api base url

## Hosting and API Playground (Optional)

The API is hosted in vercel with the url [Deployed to Vercel](https://profile-api-liart.vercel.app/)

## Process

- Users can register a new account or log in using their credentials.
- Alternatively, they can log in or register using Google.
- Upon successful authentication, users can access their profile details and make edits as necessary.
- Users can upload a new photo or provide an image URL for their profile picture.
- They can choose to set their profile as public or private.
- Admin users have access to both public and private profiles, while normal users can only view public profiles.
- Proper error handling, validation, and security measures are implemented throughout the system.
- Optionally, the API can be hosted on Heroku, and Swagger documentation can be provided for interactive testing of endpoints.

## Demo

- [Deployed to Vercel](https://profile-api-liart.vercel.app/)
