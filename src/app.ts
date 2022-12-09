import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';

import morgan from 'morgan';

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const createApp = () => {
  const app: Express = express();
  app.use(cors(corsOptions));

  app.use(morgan('combined'));
  app.use(express.json());
  app.use(router);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status, message } = err;
    console.error(err);
    res.status(status || 500).json({ message });
  });

  return app;
};

export { createApp };
