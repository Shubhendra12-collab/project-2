import { NextFunction, Request, Response } from "express";

//* error handling middleware
const errorHandler = (err: any, _:  Request, res: Response, next: NextFunction) => {
  const message = err?.message ?? "something went wrong";
  const status = err?.status ?? "error";
  const success = err?.success ?? false;
  const statusCode =err?.statusCode ?? 500;

  res.status(statusCode).json({
    success,
    status ,
    message ,
    data: null,
    stack: err?.stack ?? null,
  });
}

export default errorHandler;