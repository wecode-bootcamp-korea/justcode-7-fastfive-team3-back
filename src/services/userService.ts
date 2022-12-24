import usersDao from '../models/userDao';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.SECRET_KEY;

const checkUserPermission = async (userId: number) => {
  let findUserInfo = await usersDao.checkUserPermission(userId);

  const userGroupId = findUserInfo.group_id;

  console.log('userGroupId =', userGroupId);
  console.log('findUserInfo', findUserInfo);

  let findGroupFeed = await usersDao.findGroupFeed(userGroupId);

  // if (!findGroupFeed) {
  //   (findGroupFeed.group_feed_exist = false), (findGroupFeed.feed_id = false);
  // }
  console.log('findGroupFeed =', findGroupFeed);

  findUserInfo.group_feed_exist = findGroupFeed.group_feed_exist;
  findUserInfo.feed_id = findGroupFeed.feed_id;

  console.log('findUserInfo =', findUserInfo);
  return findUserInfo;
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
    groupId = await usersDao.findGroupId(companyName);
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
    error.status = 401;
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
