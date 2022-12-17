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

const updateReply = async (
  user_id: number,
  reply_id: number,
  comment: string
) => {
  const [isReply] = await replyDao.findReply(reply_id);
  console.log('isReply =', isReply);
  if (!isReply) {
    throw { status: 400, message: 'REPLY_IS_NOT_EXIST' };
    return;
  }

  if (isReply.user_id !== user_id) {
    throw { status: 400, message: 'ONLY_WRITER_CAN_UPDATE' };
    return;
  }

  if (isReply.comment === comment) {
    throw { status: 400, message: 'NO_CHANGE' };
  }

  return await replyDao.updateReply(reply_id, comment);
};

export default { getListOfRepliesByFeed, crateReply, updateReply };
