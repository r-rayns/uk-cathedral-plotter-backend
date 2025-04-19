import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to handle Cross-Origin Resource Sharing (CORS) settings.
 */
export const cors = (isProduction = false) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if ( !isProduction ) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    }
    next();
  };
};