import usersDao from '../models/userDao';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.SECRET_KEY;

const checkUserPermission = async (user_id: number) => {
  // TODO 유저 회사의 입주상태에 따른 에러메세지 처리 추가하기
  return await usersDao.checkUserPermission(user_id);
};

const signUp = async (
  nickname: string,
  password: string,
  email: string,
  positionName: string,
  companyName: string,
  startDate?: string,
  endDate?: string,
  isAdmin?: boolean
) => {
  const salt = await bcrypt.genSalt();
  const hashedPw = bcrypt.hashSync(password, salt);

  isAdmin = isAdmin ? true : false;
  console.log('is_admin =', isAdmin);
  let groupId = await usersDao.findGroupId(companyName);

  let residencePeriod = ``;

  if (!groupId) {
    if (startDate && endDate) {
      residencePeriod = `
      ,
      start_date = "${startDate}",
      end_date = "${endDate}"
      `;
    }

    await usersDao.createCompanyGroup(companyName, residencePeriod);

    const result = await usersDao.findGroupId(companyName);
    groupId = result;
  }
  groupId = groupId.id;
  return await usersDao.signUp(
    nickname,
    hashedPw,
    email,
    positionName,
    groupId,
    isAdmin
  );
};

const logIn = async (email: string, password: string) => {
  const userInfo = await usersDao.logIn(email);
  if (!userInfo) {
    const error = new Error("User doesn't exist");
    error.status = 404;
    throw error;
  }

  const isSame = bcrypt.compareSync(password, userInfo.password);
  if (!isSame) {
    const error = new Error('Your password is incorrect');
    error.status = 400;
    throw error;
  }
  const token = jwt.sign({ id: userInfo.id }, jwtSecret);
  const authInfo = {
    token: token,
    id: userInfo.id,
    nickname: userInfo.nickname,
    email: userInfo.email,
    sort_id: userInfo.sort_id,
    is_admin: userInfo.is_admin,
  };
  return { authInfo };
};

export default { signUp, logIn, checkUserPermission };
