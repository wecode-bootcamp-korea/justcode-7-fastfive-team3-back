import dotenv from 'dotenv';
import { createApp } from './app';

dotenv.config();

const startServer = async () => {
  const app = createApp();
  const port = process.env.PORT;
  const url = process.env.ORIGIN_URL;

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${url}${port}`);
  });
};

startServer();
