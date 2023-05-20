import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export default function (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({ message: "something went wrong" });
}
