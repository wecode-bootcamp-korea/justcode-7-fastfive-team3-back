import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import userDao from '../models/userDao';
// FIXME any를 없애면 6번줄 catch에서 에러 발생
function catchMiddleware(controller: RequestHandler | any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await controller(req, res, next).catch(next);
  };
}

async function authMiddleware(req: Request, _: any, next: NextFunction) {
  let token = req.headers.authorization;

  if (!token) {
    throw { status: 401, message: 'TOKEN_DOES_NOT_EXIST' };
  }

  token = token.includes('Bearer') ? token.replace(/^Bearer\s+/, '') : token;
  let decodedToken: any;
  decodedToken = jwt.verify(
    token,
    process.env.SECRET_KEY || 'MISSING_SECRET_KEY'
  );

  req.userInfo = { id: decodedToken.id };
  next();
}

async function checkPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId: number = req.userInfo.id;
  const userPermission = await userDao.checkUserPermission(userId);
  if (
    userPermission.member_type === '퇴주자' ||
    userPermission.member_type === '일반가입자'
  ) {
    throw { status: 403, message: 'CURRENT_RESIDENT_ONLY' };
    return;
  }
  next();
}

export { catchMiddleware, authMiddleware, checkPermission };
