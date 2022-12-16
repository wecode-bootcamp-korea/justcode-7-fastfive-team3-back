import usersService from '../services/userService';
import { checkRequireKeys } from '../utils/util';
import { Request, Response } from 'express';

type requireKeys = {
  email: string;
  password: string;
  nickname?: string;
  company_name?: string;
  sort_id?: number;
  is_admin?: number;
};

const signUp = async (req: Request, res: Response) => {
  const { nickname, password, email, company_name, sort_id, is_admin } =
    req.body;
  const REQUIRED_KEYS: requireKeys = {
    nickname,
    password,
    email,
    company_name,
    sort_id,
    is_admin,
  };
  checkRequireKeys(REQUIRED_KEYS);
  await usersService.signUp(
    nickname,
    password,
    email,
    company_name,
    sort_id,
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

export default { signUp, login };
