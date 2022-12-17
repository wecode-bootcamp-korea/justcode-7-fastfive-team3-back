import replyDao from '../models/replyDao';

const getListOfRepliesByFeed = async (feed_id: number) => {
  return await replyDao.getListOfRepliesByFeed(feed_id);
};

export default { getListOfRepliesByFeed };
