import subhomeDao from '../models/subhomeDao';

const getSubhomeList = async (cursorId: number | null) => {
  if (!cursorId || cursorId === 1) {
    cursorId = 0;
  }
  return await subhomeDao.getSubhomeList(cursorId);
};

const getSubhome2List = async (categoryId?: String) => {
  const randomNumber = Math.floor(Math.random() * 10 + 1);
  const randomCategoryId = `
    AND f.category_id = ${randomNumber}
    OR c2.id = ${randomNumber}
    `;
  const categoryArr = (categoryId?: String) => {
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
  return categoryId
    ? await subhomeDao.getSubhome2List(categoryArr(categoryId))
    : await subhomeDao.getSubhome2List(randomCategoryId);
};
export default { getSubhomeList, getSubhome2List };
