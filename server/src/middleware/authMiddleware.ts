import { Request, Response, NextFunction } from "express";

export function isAuthenticated(
  req: Request & { session?: { username?: string } },
  res: Response, 
  next: NextFunction
) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).send("Unauthorized: You need to be logged in to access this resource.");
  }
}