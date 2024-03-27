import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "http-errors";
import { verifyToken } from "../helpers/jwt.helper";
import { AuthorizedUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      currentUser: AuthorizedUser;
    }
  }
}

export default class AuthService {
  /**
   * isAuthenticated middleware
   */
  public async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers.authorization)
        throw new Unauthorized(
          "Unauthorized access. Please login to continue."
        );

      const token = req.headers.authorization?.split(" ")?.[1];

      if (!token)
        throw new Unauthorized(
          "Unauthorized access. Please login to continue."
        );

      // extract token from header
      const decoded = await verifyToken(token);
      req.currentUser = {
        _id: decoded?._id,
        email: decoded?.email,
        role: decoded?.role,
      };
      next();
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        success: false,
        msg: err.message,
      });
    }
  }
  public async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization)
        throw new Unauthorized(
          "Unauthorized access. Please login to continue."
        );

      const token = req.headers.authorization?.split(" ")?.[1];

      if (!token)
        throw new Unauthorized(
          "Unauthorized access. Please login to continue."
        );

      // extract token from header
      const decoded = await verifyToken(token);
      req.currentUser = {
        _id: decoded?._id,
        email: decoded?.email,
        role: decoded?.role,
      };

      if (decoded?.role !== "ADMIN")
        throw new Unauthorized("Unauthorized access. Permission not granted.");

      next();
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        success: false,
        msg: err.message,
      });
    }
  }
  public async checkAuthentication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers?.authorization?.split(" ")?.[1];

      if (token) {
        // extract token from header
        const decoded = await verifyToken(token);
        req.currentUser = {
          _id: decoded?._id,
          email: decoded?.email,
          role: decoded?.role,
        };

        return next();
      }

      next();
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        success: false,
        msg: err.message,
      });
    }
  }
}
