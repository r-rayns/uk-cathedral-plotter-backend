import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error.js';
import chalk from 'chalk';
import { ServerError } from '../models/response-codes.js';
import logger from '../utils/logger.js';

const errorHandler = () => {
  // Do not remove the next parameter as it will change the signature of the middleware and err will become the res
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (err: Error | ApiError, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ApiError) {
      logger.log(chalk.red(`API ERROR: ${ err.message } - [${ err.statusCode }]`));
      res.status(err.statusCode).json({ message: err.message });
    } else {
      logger.log(chalk.red(`UNKNOWN ERROR:`), (err?.message || err));
      res.status(ServerError.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
    }
  };
};

export default errorHandler