import myDataSource from './index';

const getSubhomeList = async () => {
  return await myDataSource;
};

export default { getSubhomeList };
