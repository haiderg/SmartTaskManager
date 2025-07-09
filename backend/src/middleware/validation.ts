import { Request, Response, NextFunction } from 'express';

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  if (title.length > 100) {
    return res.status(400).json({ error: 'Title must be less than 100 characters' });
  }
  
  next();
};