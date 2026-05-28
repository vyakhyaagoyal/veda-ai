import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export interface AuthRequest
  extends Request {
  userId?: string;
}

export const protect =
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let token =
        req.cookies.token;

      if (!token) {
        const authHeader =
          req.headers.authorization;

        if (
          authHeader &&
          authHeader.startsWith(
            "Bearer "
          )
        ) {
          token =
            authHeader.slice(7);
        }
      }

      if (!token) {
        return res.status(401).json({
          message:
            "Unauthorized",
        });
      }

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as {
          userId: string;
        };

      req.userId =
        decoded.userId;

      next();
    } catch (error) {
      return res.status(401).json({
        message:
          "Invalid token",
      });
    }
  };