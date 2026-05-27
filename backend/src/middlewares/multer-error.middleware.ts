import multer from "multer";
import { NextFunction, Request, Response } from "express";

export const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (
    err instanceof multer.MulterError &&
    err.code === "LIMIT_FILE_SIZE"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "File size too large. Maximum allowed size is 25MB.",
    });
  }

  next(err);
};