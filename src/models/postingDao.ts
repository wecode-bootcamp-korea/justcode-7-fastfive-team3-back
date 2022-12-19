import myDataSource from './index';

const findUserAuth = async (userId: number) => {
  let [userAuth] = await myDataSource.query(`
    SELECT
        sort_id, is_admin
    FROM
        users
    WHERE
        id = '${userId}'
  `);

  const userSortId = userAuth.sort_id;
  const userAdminId = userAuth.is_admin;
  userAuth = { userSortId, userAdminId };
  return userAuth;
};

const isExistFeed = async (userId: number) => {
  let feed = await myDataSource.query(`
  SELECT
      id
  FROM
      feeds
  WHERE
      user_id = '${userId}' AND status_id = 1
  `);

  return feed;
};

const isExistTemporarySaveFeed = async (userId: number) => {
  let TemporarySaveFeed = await myDataSource.query(`
  SELECT
      id
  FROM
      feeds
  WHERE
      user_id = '${userId}' AND status_id = 3
  `);

  return TemporarySaveFeed;
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

  return branchId;
};

const createTemporarySaveFeed = async (
  userId: number,
  categoryId: number | null,
  title: string | null,
  image: string | null,
  introduction: string | null,
  hompage: string | null,
  detail_introduction: string | null,
  member_benefit: string | null,
  contact: string | null,
  branchId: number | null
) => {
  await myDataSource.query(`
    INSERT INTO feeds
        (user_id, category_id, title, logo_img, introduction, website_url, detail_introduction, member_benefit, contact, use_branch_id, status_id)
    VALUES
        ('${userId}', ${categoryId}, '${title}', '${image}', '${introduction}', '${hompage}', '${detail_introduction}', '${member_benefit}', '${contact}', ${branchId}, 3)
  `);
};

const getFeed = async (feedId: number) => {
  let feeds = await myDataSource.query(`
    SELECT
        f.id AS feed_id,
        c.id AS category_id,
        c.category,
        c3.parent_category_id AS parent_category_id,
        c3.category AS parent_category,
        f.title,
        f.logo_img,
        f.introduction,
        f.website_url,
        fi.field_name,
        f.detail_introduction,
        f.member_benefit,
        f.contact,
        cf.file_name,
        cf.file_link,
        b.branch_name,
        f.updated_at
    FROM
        feeds AS f
            LEFT JOIN
        category AS c ON c.id = f.category_id
            LEFT JOIN
        (SELECT
            c1.id, c1.category AS detail, c2.category, c2.id as parent_category_id
        FROM
            category AS c1
        INNER JOIN category AS c2 ON c2.id = c1.parent_category_id) AS c3 ON c3.id = c.id
            LEFT JOIN
        (SELECT
            feeds_id,
                JSON_ARRAYAGG(JSON_OBJECT('id', main_field.id, 'main_field', main_field.field_name)) AS field_name
        FROM
            feeds_main_fields
        JOIN main_field ON feeds_main_fields.main_field_id = main_field.id
        GROUP BY feeds_id) AS fi ON fi.feeds_id = f.id
            LEFT JOIN
        (SELECT
            feed_id, file_name, file_link
        FROM
            company_file) AS cf ON cf.feed_id = f.id
            LEFT JOIN
        (SELECT
            id, branch_name
        FROM
            branch) AS b ON b.id = f.use_branch_id
        WHERE f.id = '${feedId}';
  `);

  feeds = [...feeds].map(item => {
    return {
      ...item,
      field_name: JSON.parse(item.field_name),
    };
  });

  return feeds;
};

const updateTemporarySaveFeed = async (
  userId: number,
  categoryId: number | null,
  title: string | null,
  image: string | null,
  introduction: string | null,
  hompage: string | null,
  detail_introduction: string | null,
  member_benefit: string | null,
  contact: string | null,
  branchId: number | null
) => {
  await myDataSource.query(`
    UPDATE feeds
    SET
        user_id = '${userId}',
        category_id = ${categoryId},
        title = '${title}',
        logo_img = '${image}',
        introduction = '${introduction}',
        website_url = '${hompage}',
        detail_introduction = '${detail_introduction}',
        member_benefit = '${member_benefit}',
        contact = '${contact}',
        use_branch_id = ${branchId},
        status_id = '3'
    WHERE
        user_id = '${userId}'
  `);
};

const updateFeed = async (
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
    UPDATE feeds
    SET
        user_id = '${userId}',
        category_id = '${categoryId}',
        title = '${title}',
        logo_img = '${image}',
        introduction = '${introduction}',
        website_url = '${hompage}',
        detail_introduction = '${detail_introduction}',
        member_benefit = '${member_benefit}',
        contact = '${contact}',
        use_branch_id = '${branchId}',
        status_id = '1'
    WHERE
        user_id = '${userId}'
  `);
};

const findFeedId = async (userId: number) => {
  let [feedId] = await myDataSource.query(`
    SELECT
        id
    FROM
        feeds
    WHERE
        user_id = '${userId}'
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

const foreignKeySetZero = async () => {
  await myDataSource.query(`
      SET foreign_key_checks = 0
  `);
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

const foreignKeySetOne = async () => {
  await myDataSource.query(`
      SET foreign_key_checks = 1
  `);
};

const findMainFieldId = async (mainFieldArray: string[]) => {
  let mainFieldIdArray: (number | null)[] = [null, null, null, null, null];

  for (let i = 0; i < mainFieldArray.length; i++) {
    const [mainFieldId] = await myDataSource.query(`
      SELECT
          id
      FROM
          main_field
      WHERE
          field_name = '${mainFieldArray[i]}'
    `);
    mainFieldIdArray[i] = mainFieldId.id;
  }

  return mainFieldIdArray;
};

const insertMainFieldId = async (
  feedId: number,
  mainFieldId: (number | null)[]
) => {
  for (let i = 0; i < mainFieldId.length; i++) {
    await myDataSource.query(`
      INSERT INTO feeds_main_fields
          (feeds_id, main_field_id)
      VALUES
          (${feedId}, ${mainFieldId[i]})
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

const findfeedsMainFieldId = async (feedId: number) => {
  const feedsMainFieldId = await myDataSource.query(`
    SELECT
        id
    FROM
        feeds_main_fields
    WHERE
        feeds_id = '${feedId}'
  `);

  return feedsMainFieldId;
};

const setNull = async (feedId: number, feedsMainFieldArray: number[]) => {
  for (let i = 0; i < feedsMainFieldArray.length; i++) {
    await myDataSource.query(`
      UPDATE feeds_main_fields
      SET
          feeds_id = '${feedId}',
          main_field_id = null
      WHERE
          id = '${feedsMainFieldArray[i]}'
    `);
  }
};

const updateMainFieldId = async (
  feedId: number | null,
  mainFieldId: number[] | null,
  feedsMainFieldArray: number[]
) => {
  for (let i = 0; i < mainFieldId.length; i++) {
    await myDataSource.query(`
      UPDATE feeds_main_fields
      SET
          feeds_id = ${feedId},
          main_field_id = ${mainFieldId[i]}
      WHERE
          id = ${feedsMainFieldArray[i]}
    `);
  }
};

const updateFile = async (feedId: number, fileName: string, file: string) => {
  await myDataSource.query(`
    UPDATE company_file
    SET
        feed_id = '${feedId}',
        file_name = '${fileName}',
        file_link= '${file}'
    WHERE
        feed_id = '${feedId}'
  `);
};

export default {
  findUserAuth,
  isExistFeed,
  isExistTemporarySaveFeed,
  findBranchId,
  createTemporarySaveFeed,
  getFeed,
  updateTemporarySaveFeed,
  updateFeed,
  findFeedId,
  insertMainField,
  foreignKeySetZero,
  deleteOverlapMainField,
  foreignKeySetOne,
  findMainFieldId,
  insertMainFieldId,
  insertFile,
  findfeedsMainFieldId,
  setNull,
  updateMainFieldId,
  updateFile,
};
