import subhomeDao from '../models/subhomeDao';

const getSubhomeList = async () => {
  return await subhomeDao.getSubhomeList();
};

const getSubhome2List = async (category_id: number) => {
  const randomNumber = Math.floor(Math.random() * 10 + 1);
  console.log('randomNumber =', randomNumber);
  const randomCategoryId = `
    AND f.category_id = ${randomNumber}
    `;
  const categoryArr = (category_id: number) => {
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
  const changeParameter = category_id
    ? await subhomeDao.getSubhome2List(categoryArr(category_id))
    : await subhomeDao.getSubhome2List(randomCategoryId);
  return changeParameter;
};
export default { getSubhomeList, getSubhome2List };
