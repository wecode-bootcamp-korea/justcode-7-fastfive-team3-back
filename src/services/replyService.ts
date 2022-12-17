import replyDao from '../models/replyDao';

const getListOfRepliesByFeed = async (feed_id: number) => {
  return await replyDao.getListOfRepliesByFeed(feed_id);
};

const crateReply = async (
  user_id: number,
  feed_id: number,
  comment: string,
  parent_reply_id?: number
) => {
  if (!parent_reply_id) {
    parent_reply_id = 0;
  }
  return await replyDao.createReply(user_id, feed_id, comment, parent_reply_id);
};
export default { getListOfRepliesByFeed, crateReply };
