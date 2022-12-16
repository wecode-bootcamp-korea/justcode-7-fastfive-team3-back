import myDataSource from './index';

const findUserAuth = async (userId: number) => {
  let [userAuth] = await myDataSource.query(`
  SELECT
      sort_id, is_admin
  FROM
      users
  WHERE
      id = '${userId}';
  `);

  const userSortId = userAuth.sort_id;
  const userAdminId = userAuth.is_admin;
  userAuth = { userSortId, userAdminId };
  return userAuth;
};

const findBranchId = async (branch: string) => {
  let [branchId] = await myDataSource.query(`
    SELECT
        id
    FROM
        branch
    WHERE
        branch_name = '${branch}'
  `);

  branchId = branchId.id;
  return branchId;
};

const findCategoryId = async (category: string) => {
  let [categoryId] = await myDataSource.query(`
    SELECT
        id
    FROM
        category
    WHERE
        category = '${category}'
  `);

  categoryId = categoryId.id;
  return categoryId;
};

const createFeed = async (
  userId: number,
  categoryId: number,
  title: string,
  image: string,
  introduction: string,
  hompage: string,
  detail_introduction: string,
  member_benefit: string | string[],
  contact: string | string[],
  branchId: number
) => {
  await myDataSource.query(`
    INSERT INTO feeds
        (user_id, category_id, title, logo_img, introduction, website_url, detail_introduction, member_benefit, contact, use_branch_id, status_id)
    VALUES
        ('${userId}', '${categoryId}', '${title}', '${image}', '${introduction}', '${hompage}', '${detail_introduction}', '${member_benefit}', '${contact}', '${branchId}', '1')
  `);
};

const findFeedId = async (title: string) => {
  let [feedId] = await myDataSource.query(`
    SELECT
        id
    FROM
        feeds
    WHERE
        title = '${title}'
  `);

  feedId = feedId.id;
  return feedId;
};

const insertMainField = async (mainFieldArray: string[]) => {
  for (let i = 0; i < mainFieldArray.length; i++) {
    await myDataSource.query(`
      INSERT INTO main_field
          (field_name)
      VALUES
          ('${mainFieldArray[i]}')
    `);
  }
};

const deleteOverlapMainField = async () => {
  await myDataSource.query(`
    DELETE
        a
    FROM
        main_field a , main_field b
    WHERE
        a.id > b.id AND a.field_name = b.field_name
  `);
};

const foreignKeySetZero = async () => {
  await myDataSource.query(`
      SET foreign_key_checks = 0
  `);
};

const findMainFieldId = async (mainFieldArray: string[]) => {
  const mainFieldIdArray: number[] = [];

  for (let i = 0; i < mainFieldArray.length; i++) {
    const [mainFieldId] = await myDataSource.query(`
      SELECT
          id
      FROM
          main_field
      WHERE
          field_name = '${mainFieldArray[i]}'
    `);
    mainFieldIdArray.push(mainFieldId.id);
  }

  return mainFieldIdArray;
};

const foreignKeySetOne = async () => {
  await myDataSource.query(`
      SET foreign_key_checks = 1
  `);
};

const insertMainFieldId = async (feedId: number, mainFieldId: number[]) => {
  for (let i = 0; i < mainFieldId.length; i++) {
    await myDataSource.query(`
      INSERT INTO feeds_main_fields
          (feeds_id, main_field_id)
      VALUES
          ('${feedId}', '${mainFieldId[i]}')
    `);
  }
};

const insertFile = async (feedId: number, fileName: string, file: string) => {
  await myDataSource.query(`
    INSERT INTO company_file
      (feed_id, file_name, file_link)
    VALUES
      ('${feedId}', '${fileName}', '${file}')
  `);
};

export default {
  findUserAuth,
  findBranchId,
  findCategoryId,
  createFeed,
  findFeedId,
  insertMainField,
  foreignKeySetZero,
  deleteOverlapMainField,
  foreignKeySetOne,
  findMainFieldId,
  insertMainFieldId,
  insertFile,
};
