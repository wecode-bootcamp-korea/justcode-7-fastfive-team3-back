import replyDao from '../models/replyDao';

const limit = 20;
const getListOfRepliesByFeed = async (
  userId: number,
  feedId: number,
  page: number
) => {
  if (!page) {
    page = 1;
  }
  const pageOffset: number = (page - 1) * limit;
  const pagenation = `
  LIMIT ${pageOffset}, ${limit}
  `;

  const [replyCnt] = await replyDao.getCountOfAllComments(feedId);
  const totalNumberOfReplies = Number(replyCnt.reply_cnt);
  const replyPageCnt = Math.ceil(totalNumberOfReplies / limit);
  const enableAddReply = totalNumberOfReplies < 1000;
  const result = await replyDao.getListOfRepliesByFeed(
    userId,
    feedId,
    pagenation
  );

  return { replyPageCnt, totalNumberOfReplies, enableAddReply, result };
};

const crateReply = async (
  userId: number,
  feedId: number,
  comment: string,
  parentReplyId?: number,
  isPrivate?: boolean
) => {
  const [replyCnt] = await replyDao.getCountOfAllComments(feedId);
  const totalNumberOfReplies = Number(replyCnt.reply_cnt);
  if (totalNumberOfReplies >= 1000) {
    throw { status: 400, message: 'REPLIES_ARE_FULL ' };
    return;
  }

  if (!parentReplyId) {
    parentReplyId = 0;
  }

  isPrivate = isPrivate ?? false;

  const createdNewComment = await replyDao.createReply(
    userId,
    feedId,
    comment,
    parentReplyId,
    isPrivate
  );

  const newReplyId: number = createdNewComment[0].id;
  const findReplyArrIndex = await replyDao.findReplyIndex(newReplyId, feedId);
  const page = Math.ceil(findReplyArrIndex / limit);

  let result = await getListOfRepliesByFeed(userId, feedId, page);

  const replyIdForFindReply: number = createdNewComment[0].id;
  const [mailInfoSrc] = await replyDao.findReply(replyIdForFindReply);
  const replyUser: string = mailInfoSrc.reply_user;
  const feedUser: string = mailInfoSrc.feed_user;
  const feedUserMail: string = mailInfoSrc.feed_user_email;
  const parentReplyUser: string = mailInfoSrc.parent_reply_user;
  const parentReplyUserMail: string = mailInfoSrc.parent_reply_user_mail;

  const parentReplyMailInfo = {
    replyUser: replyUser,
    userName: parentReplyUser,
    userMail: parentReplyUserMail,
  };
  const feedUserMailInfo = {
    replyUser: replyUser,
    userName: feedUser,
    userMail: feedUserMail,
  };

  const mailInfo = parentReplyUserMail ? parentReplyMailInfo : feedUserMailInfo;
  const pageNumberOfPagenation = page;

  [result] = [result].map(object => {
    return {
      message: 'SUCCESSFULLY_CREATED_REPLY',
      createdNewComment: createdNewComment,
      pageNumberOfPagenation: pageNumberOfPagenation,
      ...object,
    };
  });

  return { result, mailInfo };
};

const updateReply = async (
  userId: number,
  replyId: number,
  comment: string,
  isPrivate?: boolean
) => {
  const [isReply] = await replyDao.findReply(replyId);
  if (!isReply) {
    throw { status: 404, message: 'REPLY_IS_NOT_EXIST' };
    return;
  }

  if (isReply.user_id !== userId) {
    throw { status: 403, message: 'ONLY_WRITER_CAN_UPDATE' };
    return;
  }

  isPrivate = isPrivate ?? isReply.is_private;
  if (isReply.comment === comment && isReply.is_private === isPrivate) {
    throw { status: 409, message: 'NO_CHANGE' };
  }

  const statusValue = `, is_private = ${isPrivate}`;

  const updatedComment = await replyDao.updateReply(
    replyId,
    comment,
    statusValue
  );

  const newReplyId: number = updatedComment[0].id;
  const feedId: number = updatedComment[0].feed_id;
  const findReplyArrIndex = await replyDao.findReplyIndex(newReplyId, feedId);
  const page = Math.ceil(findReplyArrIndex / limit);

  let result = await getListOfRepliesByFeed(userId, feedId, page);

  [result] = [result].map(object => {
    return {
      message: 'SUCCESSFULLY_UPDATED_REPLY',
      updatedComment: updatedComment,
      pageNumberOfPagenation: page,
      ...object,
    };
  });

  return result;
};

const deleteReply = async (userId: number, replyId: number) => {
  const [isReply] = await replyDao.findReply(replyId);
  if (!isReply) {
    throw { status: 404, message: 'REPLY_IS_NOT_EXIST' };
    return;
  }

  if (isReply.is_deleted === true) {
    throw { status: 404, message: 'REPLY_IS_ALREADY_DELETED' };
    return;
  }

  if (isReply.user_id !== userId) {
    throw { status: 403, message: 'ONLY_WRITER_CAN_DELETE' };
    return;
  }

  const feedId = isReply.feed_id;
  const findReplyArrIndex = await replyDao.findReplyIndex(replyId, feedId);
  let page = Math.ceil(findReplyArrIndex / limit);
  if (findReplyArrIndex % limit === 1) {
    page = page - 1;
  }
  page = page === 0 ? 1 : page;

  await replyDao.deleteReply(replyId);
  let result = await getListOfRepliesByFeed(userId, feedId, page);

  [result] = [result].map(object => {
    return {
      message: 'SUCCESSFULLY_DELETED_REPLY',
      pageNumberOfPagenation: page,
      ...object,
    };
  });

  return result;
};

export default { getListOfRepliesByFeed, crateReply, updateReply, deleteReply };
