import { JwtPayload } from 'jsonwebtoken';
import auth from '../middlewares/middleware';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPEORM_CONNECTION: 'mysql' | 'mariadb';
      TYPEORM_PORT: number;
      SECRET_KEY: string;
      TYPEORM_LOGGING: boolean;
    }
  }
  namespace Express {
    interface Request {
      userInfo?: userInfo;
    }
    interface Response {
      status: number;
    }
  }

  interface Error {
    status: number;
  }
  export class MissingDriverError extends Error {
    name = 'MissingDriverError';

    constructor(driverType: string) {
      super();
      Object.setPrototypeOf(this, MissingDriverError.prototype);
      this.message = `Wrong driver: "${driverType}" given. Supported drivers are: "cordova", "mariadb", "mongodb", "mssql", "mysql", "oracle", "postgres", "sqlite", "sqljs", "react-native".`;
    }
  }
}
