import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler, NextFunction } from 'express';
// FIXME any를 없애면 6번줄 catch에서 에러 발생
function catchMiddleware(controller: RequestHandler | any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await controller(req, res, next).catch(next);
  };
}

async function authMiddleware(req: Request, _: any, next: NextFunction) {
  // FIXME 'Bearer' string이 없을때 오류없는지 확인해봐야 함
  let token = req.headers.authorization;
  token = token.includes('Bearer') ? token.replace(/^Bearer\s+/, '') : token;
  let decodedToken: any;
  decodedToken = jwt.verify(
    token,
    process.env.SECRET_KEY || 'MISSING_SECRET_KEY'
  );
  req.userInfo = { id: decodedToken.id };
  next();
}

export { catchMiddleware, authMiddleware };
