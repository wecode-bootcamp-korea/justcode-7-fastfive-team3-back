import myDataSource from './index';

const signUp = async (
  nickname: string,
  hashedPw: string,
  email: string,
  sort_id: number,
  is_admin: number
) => {
  await myDataSource.query(
    `
        INSERT INTO users (nickname, password, email, sort_id, is_admin)
        VALUES (?, ?, ?, ?, ?)
    `,
    [nickname, hashedPw, email, sort_id, is_admin]
  );
};

const logIn = async (email: string) => {
  const [result] = await myDataSource.query(
    `
        SELECT *
        FROM users
        WHERE email = ?
    `,
    [email]
  );
  return result;
};

export default { signUp, logIn };
