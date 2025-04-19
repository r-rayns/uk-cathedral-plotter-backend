import { Request, Response } from 'express';
import morgan, { TokenIndexer } from 'morgan';
import chalk from 'chalk';
import { isNil } from 'lodash-es';
import { env, NodeEnv } from '../services/env-loader.service.js';
import { DateTime } from 'luxon';

const placeholder = '_';

/**
 * Middleware for formatting the logging of requests and responses. Uses the Morgan logging library.
 */
export const requestResponseLogger = morgan((tokens: TokenIndexer<Request, Response>, req: Request, res: Response): string => {
  const isProduction = env.NODE_ENV === NodeEnv.PRODUCTION;
  const permissiveCorsMessage = ' (i) Permissive CORS policy is active';
  // Get the request method or fallback to the placeholder
  // Using optional chaining on the function call because the token might not exist
  const method: string = tokens.method?.(req, res) ?? placeholder;

  const isOptions = method.toLowerCase() === 'options';
  // Colour the status code
  const statusCode: string = colourStatusCode(res.statusCode, isOptions);
  const url: string = tokens.url?.(req, res) ?? placeholder;
  const responseTime: string = colourResponseTime(tokens['response-time']?.(req, res), isOptions);
  const contentLength: string = res.get('content-length') ?? placeholder;
  const corsOriginPolicy: string = res.getHeader('access-control-allow-origin') === '*' ? permissiveCorsMessage : '';
  return [
    // Don't log time in production that will be done by sys log
    !isProduction ? chalk.bold(DateTime.now().toISOTime()) : '',
    isOptions ? method : chalk.blue(method),
    url,
    statusCode,
    responseTime,
    ' - ',
    `(response-length: ${contentLength})`,
    isOptions ? '' : chalk.yellow(corsOriginPolicy),
  ].join(' ');
})

function colourStatusCode(statusCode: number| undefined, isOptions: boolean): string {
  let statusCodeString: string = '';

  if (isNil(statusCode)) {
    statusCodeString = placeholder;
  } else if (statusCode >= 500) {
    statusCodeString = chalk.red(statusCode);
  } else if (statusCode >= 400) {
    statusCodeString = chalk.yellow(statusCode);
  } else if (statusCode >= 300) {
    statusCodeString = chalk.cyan(statusCode);
  } else if (statusCode >= 200 && !isOptions) {
    statusCodeString = chalk.green(statusCode);
  }
  return statusCodeString;
}

function colourResponseTime(responseTime: string | undefined, isOptions: boolean): string {
  if (isNil(responseTime)) return placeholder;
  if (isOptions) return `${responseTime}ms`;
  try {
    const parsedTime: number = parseFloat(responseTime);
    if (parsedTime < 100) {
      return chalk.green.bold(`${parsedTime}ms`);
    } else if (parsedTime < 200) {
      return chalk.yellow.bold(`${parsedTime}ms`);
    }
    return chalk.red.bold(`${parsedTime}ms`);
  } catch {
    return placeholder;
  }
}