import subhomeDao from '../models/subhomeDao';

const getSubhomeList = async (cursorId: number | null) => {
  if (!cursorId || cursorId === 1) {
    cursorId = 0;
  }
  return await subhomeDao.getSubhomeList(cursorId);
};

const getSubhome2List = async (categoryId: number | string) => {
  const randomNumber = Math.floor(Math.random() * 10 + 1);

  categoryId = categoryId ? categoryId : randomNumber;
  const aCategoryId = `
  AND f.category_id = '${categoryId}'
    OR c2.id = '${categoryId}'
  `;

  const categoryIdArr = (categoryId: number[]) => {
    let result = `
    AND f.category_id = '${categoryId[0]}'
    OR c2.id = '${categoryId[0]}'
    `;
    for (let i = 1; i < categoryId.length; i++) {
      let addCategoryId = `
      OR f.category_id = '${categoryId[i]}'
      OR c2.id = '${categoryId[i]}'
      `;
      result += `${addCategoryId}`;
    }
    return result;
  };

  categoryId = Array.isArray(categoryId)
    ? categoryIdArr(categoryId)
    : aCategoryId;

  console.log('categoryId =', categoryId);

  return await subhomeDao.getSubhome2List(categoryId);
};
export default { getSubhomeList, getSubhome2List };
