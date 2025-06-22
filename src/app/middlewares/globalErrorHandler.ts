import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.name === 'ValidationError') {
    const simplifiedErrors: Record<string, string> = {};

    Object.values(err.errors).forEach((error: any) => {
      simplifiedErrors[error.path] = error.message;
    });

    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: simplifiedErrors,
    });
    return;
  }

  res.status(500).json({
    message: 'Something went wrong',
    success: false,
    error: err.message || err,
  });
};
