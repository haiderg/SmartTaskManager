import { Request, Response, NextFunction } from 'express';

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
};