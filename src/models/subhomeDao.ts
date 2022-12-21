import myDataSource from './index';

const getSubhomeList = async (lastCursorId: number) => {
  return await myDataSource.query(
    `
        SELECT id AS category_id,
               category,
               introduction,
               category_img_url,
               IFNULL(parent_category_id, "상위 카테고리") AS parent_category_id
        FROM category c
        WHERE parent_category_id IS NULL AND id > ?
        LIMIT 2
    `,
    [lastCursorId]
  ); // TODO 배포 전 limit 수를 8로 수정하기!
};

const getSubhome2List = async (categoryId: string) => {
  return await myDataSource.query(
    `
        SELECT f.id                           AS feed_id,
               ug.company_name,
               f.logo_img,
               f.introduction,
               c.category,
               SUBSTRING(f.created_at, 1, 16) AS created_at
        FROM feeds AS f
                 LEFT JOIN category AS c ON
            f.category_id = c.id
                 LEFT JOIN users AS u ON
            f.user_id = u.id
                 LEFT JOIN user_group ug ON
            ug.id = u.group_id
        WHERE c.parent_category_id IS NULL
            ${categoryId}
        ORDER BY feed_id DESC
    `
  );
};

export default { getSubhomeList, getSubhome2List };
