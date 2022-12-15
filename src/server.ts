import dotenv from 'dotenv';
dotenv.config();
import { createApp } from './app';

const startServer = async () => {
  const app = createApp();
  const port = process.env.PORT;
  const url = process.env.ORIGIN_URL;

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${url}${port}`);
  });
};

startServer();
