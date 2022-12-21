import myDataSource from './index';

const checkUserPermission = async (user_id: number) => {
  return await myDataSource
    .query(
      `
          SELECT u.id AS user_id,
                 (CASE
                      WHEN date (ug.start_date) <= date (now())
                     AND date (ug.end_date) >= date (now())
                     AND u.is_admin = TRUE THEN TRUE
                     ELSE FALSE
                     END
                     ) AS write_permission,
                 u.is_admin,
                 (CASE
                      WHEN date (ug.start_date) <= date (now())
                     AND date (ug.end_date) >= date (now()) THEN '입주멤버'
                     WHEN date (ug.end_date) < date (now()) THEN '퇴주멤버'
                     ELSE '일반가입자'
                     END
                     ) AS member_type,
                 ug.company_name,
                 u.nickname,
                 u.email,
                 u.position_name,
                 DATE_FORMAT(ug.start_date, '%Y년 %m월 %d일') AS start_date,
                 DATE_FORMAT(ug.end_date, '%Y년 %m월 %d일') AS end_date,
                 concat("총 ", TIMESTAMPDIFF(DAY, ug.start_date, ug.end_date) + 1, "일 계약") AS period
          FROM users u
                   INNER JOIN user_group ug ON
              ug.id = u.group_id
          WHERE u.id = ?
    `,
      [user_id]
    )
    .then(value => {
      const [item] = value;
      return {
        ...item,
        write_permission: item.write_permission === '1',
        is_admin: item.is_admin === 1,
      };
    });
};

const findGroupId = async (company_name: string) => {
  const [result] = await myDataSource.query(
    `
        SELECT id
        FROM user_group
        WHERE company_name = ?
    `,
    [company_name]
  );
  return result;
};

const createCompanyGroup = async (
  company_name: string,
  residencePeriod: string
) => {
  return await myDataSource.query(
    `
        INSERT
          user_group 
          SET
          company_name = "${company_name}"
          ${residencePeriod}
    `
  );
};

const signUp = async (
  nickname: string,
  hashedPw: string,
  email: string,
  position_name: string,
  group_id: number,
  is_admin?: boolean
) => {
  await myDataSource.query(
    `
        INSERT INTO users (nickname, password, email, position_name, group_id, is_admin)
        VALUES (?, ?, ?, ?, ?, ?)
    `,
    [nickname, hashedPw, email, position_name, group_id, is_admin]
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

export default {
  signUp,
  logIn,
  checkUserPermission,
  findGroupId,
  createCompanyGroup,
};
