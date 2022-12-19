import myDataSource from './index';

const checkUserPermission = async (user_id: number) => {
  return await myDataSource
    .query(
      `
        SELECT id,
               is_admin,
               company_name,
               nickname,
               email,
               position_name,
               group_id
        FROM users u
        WHERE id = ?
    `,
      [user_id]
    )
    .then(value => {
      const [item] = value;
      return {
        ...item,
        is_admin: item.is_admin === 1,
      };
    });
};

const signUp = async (
  nickname: string,
  hashedPw: string,
  email: string,
  company_name: string,
  sort_id: number,
  is_admin: number
) => {
  await myDataSource.query(
    `
        INSERT INTO users (nickname, password, email, company_name, sort_id, is_admin)
        VALUES (?, ?, ?, ?, ?, ?)
    `,
    [nickname, hashedPw, email, company_name, sort_id, is_admin]
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

export default { signUp, logIn, checkUserPermission };
