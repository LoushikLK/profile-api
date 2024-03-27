require("dotenv").config();

const envConfig = {
  GoogleClientId: process.env.GOOGLE_CLIENT_ID || "",
  GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  GoogleRegisterCallbackURL: process.env.GOOGLE_REGISTER_CALLBACK_URL || "",
  LoginSuccessCallbackURL: process.env.LOGIN_SUCCESS_CALLBACK_URL || "",
  LoginFailedCallbackURL: process.env.LOGIN_FAIL_CALLBACK_URL || "",
  APP_PORT: process.env.PORT || "",
  MongoConnectionURI: process.env.MONGODB_URI || "",
  APP_JWT_SECRET: process.env.JWT_SECRET || "",
  PassportSessionSecret: process.env.PASSPORT_SESSION_SECRET || "",
  AppServiceEmail: process.env.SERVICE_EMAIL || "",
  AppServiceEmailPassword: process.env.EMAIL_SERVICE_PASSWORD || "",
  AppBaseApiUrl: process.env.API_BASE_URL || "",

  //APP DETAILS

  APP_NAME: process.env.APP_NAME || "",
  APP_EMAIL: process.env.EMAIL || "",

  //CLOUDINARY CONFIG
  CloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  CloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  CloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};

export default envConfig;
