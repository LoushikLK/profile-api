import cors from "cors";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import envConfig from "../configs/env.config";
import PassportService from "./passport.middleware";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Profile API Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application for profile management",
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/app/**/routes.ts", "./build/app/**/routes.js"],

  security: [
    {
      bearerAuth: [],
    },
  ],
};

const topLevelMiddleware = (app: Application) => {
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );

  app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
  app.use(express.json());

  //create session
  app.use(
    session({
      secret: envConfig.PassportSessionSecret,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    })
  );

  app.use(passport.initialize());

  //authenticate using session
  app.use(passport.authenticate("session"));

  //load passport strategies

  new PassportService().passportGoogleLoginStrategy();

  //passport middleware to serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    done(null, user as any);
  });

  app.use(helmet());

  const specs = swaggerJsDoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.use((req, res, next) => {
    console.table([
      {
        METHOD: req.method,
        PATH: req.path,
        ip: req.ip,
        AGENT: req?.get("user-agent")?.split("/")[0],
      },
    ]);

    next();
  });
};

export default topLevelMiddleware;
