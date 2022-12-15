import { DataSource } from 'typeorm';

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
});

export const findBranchId = async (branch: string) => {
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

export const createFeed = async (
  //userId
  title: string,
  image: string,
  introduction: string,
  hompage: string,
  detail_introduction: string,
  member_benefit: string | string[],
  contact: string | string[],
  file: string,
  branchId: number
) => {
  await myDataSource.query(`
    INSERT INTO feed
        (title, logo_img, introduction, website_url, detail_introduction, member_benefit, contact, file, company_file)
    VALUES
        ('${title}', '${image}', '${introduction}', '${hompage}', '${detail_introduction}', '${member_benefit}', '${contact}', '${file}', '${branchId}')
  `);
};

export const findFeedId = async (title: string) => {
  let [feedId] = await myDataSource.query(`
    SELECT
        id
    FROM
        feed
    WHERE
        title = '${title}'
  `);

  feedId = feedId.id;
  return feedId;
};

export const findCategoryId = async (category: string | string[]) => {
  let [categoryId] = await myDataSource.query(`
    SELECT
        high_rank_id, id
    FROM
        category
    WHERE
        category = '${category}'
  `);

  categoryId = categoryId.id;
  return categoryId;
};

export const insertFeedIdcategoryId = async (
  feedId: number,
  categoryId: number[]
) => {
  for (let i = 0; i < categoryId.length; i++) {
    await myDataSource.query(`
      INSERT INTO feed_category
          (feed_id, category_id)
      VALUES
          ('${feedId}', '${categoryId[i]}')
    `);
  }
};

export const insertMainField = async (main_field: string[]) => {
  for (let i = 0; i < main_field.length; i++) {
    await myDataSource.query(`
      INSERT INTO feeds_main_fields
          field_name
      VALUES
          '${main_field[i]}'
    `);
  }
};

export const deleteOverlapMainField = async () => {
  await myDataSource.query(`
    DELETE
        a
    FROM
        field_name a , field_name b
    WHERE
        a.id > b.id AND a.name = b.name
  `);
};

export const findMainFieldId = async (main_field: string[]) => {
  const mainFieldArray: number[] = [];

  for (let i = 0; i < main_field.length; i++) {
    const [mainFieldId] = await myDataSource.query(`
      SELECT
          id
      FROM
          main_field
      WHERE
          field_name = '${main_field[i]}'
    `);
    mainFieldArray.push(mainFieldId.id);
  }

  return mainFieldArray;
};

export const insertMainFieldId = async (
  feedId: number,
  mainFieldId: number[]
) => {
  for (let i = 0; i < mainFieldId.length; i++) {
    await myDataSource.query(`
      INSERT INTO feeds_main_fields
          (feeds_id, main_field_id)
      VALUES
          ('${feedId}', '${mainFieldId[i]}')
    `);
  }
};
