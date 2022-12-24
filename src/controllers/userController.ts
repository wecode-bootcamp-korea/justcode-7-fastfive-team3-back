import usersService from '../services/userService';
import { checkRequireKeys } from '../utils/util';
import { Request, Response } from 'express';

type requireKeys = {
  email: string;
  password: string;
  nickname?: string;
  position_name?: string;
  company_name?: string;
  is_admin?: boolean;
};

const checkUserPermission = async (req: Request, res: Response) => {
  const userId: number = req.userInfo.id;
  const result = await usersService.checkUserPermission(userId);
  res.status(200).json(result);
};

const signUp = async (req: Request, res: Response) => {
  const {
    nickname,
    password,
    email,
    position_name,
    company_name,
    start_date,
    end_date,
    is_admin,
  } = req.body;

  const REQUIRED_KEYS: requireKeys = {
    nickname,
    password,
    email,
    position_name,
    company_name,
  };
  checkRequireKeys(REQUIRED_KEYS);

  await usersService.signUp(
    nickname,
    password,
    email,
    position_name,
    company_name,
    start_date,
    end_date,
    is_admin
  );

  res.status(201).json({ message: `${email} signup success` });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const REQUIRED_KEYS: requireKeys = {
    email,
    password,
  };
  checkRequireKeys(REQUIRED_KEYS);
  const token: any = await usersService.logIn(email, password);

  res.status(200).json(token);
};

export default { signUp, login, checkUserPermission };
