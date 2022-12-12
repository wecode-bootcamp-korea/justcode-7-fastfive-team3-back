import type { Request, Response, NextFunction } from 'express';
declare module 'jsonwebtoken' {
  interface UserInfoPayload extends JwtPayload, InfoType {}
  function verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions & { complete?: false }
  ): UserInfoPayload;
  function sign(
    payload: InfoType,
    secretOrPrivateKey: Secret,
    options?: SignOptions
  ): string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPEORM_CONNECTION: 'mysql' | 'mariadb';
      TYPEORM_PORT: number;
      SECRET_KEY: string;
    }
  }

  namespace Express {
    interface Request {
      userInfo?: user_id;
      query?: string | number;
    }
  }

  interface Error {
    status: number;
    message: string;
    name: string;
  }
}
