import subhomeDao from '../models/subhomeDao';

const getSubhomeList = async () => {
  return await subhomeDao.getSubhomeList();
};

export default { getSubhomeList };
