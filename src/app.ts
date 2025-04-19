import logger from './utils/logger.js';
import { createExpressServer } from './express-server.js';
import { createServer } from 'http';
import chalk from 'chalk';
import { env } from './services/env-loader.service.js';

logger.log('UK Cathedral Plotter Backend')

const expressServer = createExpressServer();
const httpServer =  createServer(expressServer);

httpServer.listen(env.PORT, () => {
  logger.log(chalk.blue(`⚡️ UK Cathedral Plotter Backend server is listening for HTTP clients on port ${ env.PORT }`));
});

