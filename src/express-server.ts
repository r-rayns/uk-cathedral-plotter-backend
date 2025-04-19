import express, { Express } from 'express';
import { requestResponseLogger } from './middleware/req-res-logger.js';
import bodyParser from 'body-parser';
import { cors } from './middleware/cors.js';
import api from './routes/api.js';
import { missingRoute } from './utils/error-factory.js';
import errorHandler from './middleware/error-handler.js';
import logger from './utils/logger.js';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env, NodeEnv } from './services/env-loader.service.js';

export function createExpressServer() {
  const expressServer: Express = express()
  // Set up the request/response logger
  expressServer.use(requestResponseLogger)
  //
  // Set up the JSON parser
  expressServer.use(bodyParser.json({limit: '2MB'}))

  // Set up CORs middleware
  expressServer.use(cors(env.NODE_ENV === NodeEnv.PRODUCTION));

  // Set up the API routes
  expressServer.use('/api', api)

  // Serve the static frontend from the "public/frontend" directory
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const staticPath = path.join(currentDirPath, '../public/frontend');
  expressServer.use(express.static(staticPath));
  logger.log(`📁 A static build of the frontend will be served from: ${staticPath}`);

  // Catch invalid routes
  expressServer.use('', () => {
    throw missingRoute;
  });

  // Error handler must be placed after all other routes have been set up
  // This will gracefully handle any unexpected errors
  expressServer.use(errorHandler());

  return expressServer;
}