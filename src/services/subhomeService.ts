import subhomeDao from '../models/subhomeDao';

const getSubhomeList = async (cursorId: number | null) => {
  if (!cursorId || cursorId === 1) {
    cursorId = 0;
  }
  return await subhomeDao.getSubhomeList(cursorId);
};

const getSubhome2List = async (category_id?: String) => {
  const randomNumber = Math.floor(Math.random() * 10 + 1);
  const randomCategoryId = `
    AND f.category_id = ${randomNumber}
    `;
  const categoryArr = (category_id?: String) => {
    let result = `
    AND f.category_id = '${category_id[0]}'
    `;
    for (let i = 1; i < category_id.length; i++) {
      let addCategoryId = `
      OR f.category_id = '${category_id[i]}'
      `;
      result += `${addCategoryId}`;
    }
    return result;
  };
  return category_id
    ? await subhomeDao.getSubhome2List(categoryArr(category_id))
    : await subhomeDao.getSubhome2List(randomCategoryId);
};
export default { getSubhomeList, getSubhome2List };
