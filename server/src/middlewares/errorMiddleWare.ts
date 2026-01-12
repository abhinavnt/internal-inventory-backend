import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/HttpError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);

  let statusCode = 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e: any) => e.message)
      .join(", ");
  }

  res.status(statusCode).json({ message });
};
