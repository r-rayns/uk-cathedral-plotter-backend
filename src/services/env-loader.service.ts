import fs from 'node:fs';
import dotenv from 'dotenv';
import chalk from 'chalk';

class EnvLoaderService {
  private acceptedEnvironments: string[] = Object.values(NodeEnv);
  public env: Env;

  constructor() {
    if (process.env.NODE_ENV) {
      if (!this.acceptedEnvironments.includes(process.env.NODE_ENV)) {
        console.error(chalk.red(`Invalid node environment (NODE_ENV): ${process.env.NODE_ENV}`));
        process.exit(1);
      }
      if (fs.existsSync('.env')) {
        dotenv.config();
        this.env = this.loadEnv();
        console.log(chalk.green(`Environment variables successfully loaded. Running in ${this.env.NODE_ENV} mode.`))
      } else {
        console.error(chalk.red(`.env file was not found. Make sure it exists in the root directory of the project.`))
        process.exit(1);
      }
    } else {
      console.error(chalk.red(`No NODE_ENV environment variable was not found. Did you set it?`))
      process.exit(1);
    }
  }

  private loadEnv(): Env {
    // Simple env setup, in production we should use a more robust solution with validation
    return {
      NODE_ENV: ( process.env.NODE_ENV ?? NodeEnv.DEVELOPMENT ) as NodeEnv,
      PORT: parseInt(( process.env.PORT ?? '9212' )),
    }
  }
}


export interface Env {
  NODE_ENV: NodeEnv;
  PORT: number;
}

export enum NodeEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

export const env = new EnvLoaderService().env;