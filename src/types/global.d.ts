import type { Request, Response, NextFunction } from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPEORM_CONNECTION: 'mysql' | 'mariadb';
      TYPEORM_PORT: number;
      SECRET_KEY: string;
    }
  }
}
