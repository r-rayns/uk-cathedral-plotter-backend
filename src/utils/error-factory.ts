import { ApiError } from './api-error.js';
import { ClientError } from '../models/response-codes.js';

export const missingRoute: ApiError = new ApiError('No such resource', ClientError.NOT_FOUND);
