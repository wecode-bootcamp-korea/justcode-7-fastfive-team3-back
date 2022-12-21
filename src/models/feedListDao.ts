import myDataSource from './index';

const getFeedList = async (
  selectFilters: string | null,
  pagenation: string
) => {
  return await myDataSource.query(
    `
        WITH tables AS (SELECT f.id     AS feed_id,
                               count(*) AS comment_cnt
                        FROM replies r
                                 JOIN feeds f ON
                            f.id = r.feed_id
                        GROUP BY f.id)
        SELECT f.id AS feed_id,
               ug.company_name,
               f.introduction,
               f.logo_img,
               t1.comment_cnt,
               l.id AS location_id,
               l.location,
               ca.category
        FROM feeds f
                 LEFT JOIN users u ON
            f.user_id = u.id
                 LEFT JOIN user_group ug
                           ON
            u.group_id = ug.id
                 LEFT JOIN branch b ON
            b.id = f.use_branch_id
                 LEFT JOIN branch_location bl ON
            bl.branch_id = b.id
                 LEFT JOIN location l ON
            l.id = bl.location_id
                 LEFT JOIN category ca ON
            f.category_id = ca.id
                 LEFT JOIN tables t1 ON
            t1.feed_id = f.id
            ${selectFilters}
        ORDER BY f.updated_at DESC
            ${pagenation}
    `
  );
};

const getFeedDetail = async (feedId: number) => {
  let result = await myDataSource.query(
    `
      SELECT
        f.id AS feed_id,
        c.id AS category_id,
        c.category,
        c3.parent_category_id AS parent_category_id,
        c3.category AS parent_category,
        f.title AS company_name,
        f.logo_img,
        f.introduction,
        fi.field_name,
        f.member_benefit,
        f.website_url,
        f.detail_introduction,
        f.contact,
        cf.file_name,
        cf.file_link,
        concat(u.nickname, ' ', u.position_name) AS user_title,
        b.branch_name,
        SUBSTRING(f.updated_at, 1, 16) AS updated_at
    FROM
        feeds AS f
        LEFT JOIN users u ON u.id = f.user_id
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
        WHERE f.id = ?
    `,
    [feedId]
  );

  result = [...result].map(item => {
    return {
      ...item,
      field_name: JSON.parse(item.field_name),
    };
  });

  return result;
};

export default { getFeedList, getFeedDetail };
