import replyDao from '../models/replyDao';

const getListOfRepliesByFeed = async (
  user_id: number,
  feed_id: number,
  page: number
) => {
  let limit = 20; // TODO 테스트용으로 5 설정, 추후 mockdata  교체시 20으로 전환

  if (!page) {
    page = 1;
  }
  let pageOffset: number = (page - 1) * limit;
  let pagenation = `
  LIMIT ${pageOffset}, ${limit}
  `;

  const [replyCnt] = await replyDao.getCountOfAllComments(feed_id);
  const replyPageCnt = Math.ceil(replyCnt.reply_cnt / limit);
  const result = await replyDao.getListOfRepliesByFeed(
    user_id,
    feed_id,
    pagenation
  );

  return { replyPageCnt, result };
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
  comment: string,
  status?: boolean
) => {
  const [isReply] = await replyDao.findReply(reply_id);
  if (!isReply) {
    throw { status: 400, message: 'REPLY_IS_NOT_EXIST' };
    return;
  }

  if (isReply.user_id !== user_id) {
    throw { status: 400, message: 'ONLY_WRITER_CAN_UPDATE' };
    return;
  }

  if (isReply.comment === comment && isReply.status === status) {
    throw { status: 400, message: 'NO_CHANGE' };
  }

  if (status === undefined) {
    status = true;
  }
  const statusValue = `, status = ${status}`;

  console.log('statusValue =', statusValue);

  return await replyDao.updateReply(reply_id, comment, statusValue);
};

const deleteReply = async (user_id: number, reply_id: number) => {
  const [isReply] = await replyDao.findReply(reply_id);
  console.log('isReply =', isReply);
  if (!isReply) {
    throw { status: 400, message: 'REPLY_IS_NOT_EXIST' };
    return;
  }

  if (isReply.user_id !== user_id) {
    throw { status: 400, message: 'ONLY_WRITER_CAN_DELETE' };
    return;
  }

  return await replyDao.deleteReply(reply_id);
};

export default { getListOfRepliesByFeed, crateReply, updateReply, deleteReply };
