import { ClientError, ServerError } from '../models/response-codes.js';

export class ApiError extends Error {
  public message: string;
  public statusCode: ClientError | ServerError;

  constructor(message: string, statusCode: ClientError | ServerError) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

}