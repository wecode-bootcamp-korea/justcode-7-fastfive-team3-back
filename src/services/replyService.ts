import replyDao from '../models/replyDao';
import userDao from '../models/userDao';

const limit = 5; // TODO 테스트용으로 5 설정, 추후 mockdata  교체시 20으로 전환
const getListOfRepliesByFeed = async (
  user_id: number,
  feed_id: number,
  page: number
) => {
  if (!page) {
    page = 1;
  }
  const pageOffset: number = (page - 1) * limit;
  const pagenation = `
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
  parent_reply_id?: number,
  is_private?: boolean
) => {
  const userPermission = await userDao.checkUserPermission(user_id);
  if (!userPermission.is_admin) {
    throw { status: 400, message: 'ADMIN_ONLY' };
    return;
  }

  if (!parent_reply_id) {
    parent_reply_id = 0;
  }

  is_private = is_private ?? false;

  const createdNewComment = await replyDao.createReply(
    user_id,
    feed_id,
    comment,
    parent_reply_id,
    is_private
  );

  const newReplyId: number = createdNewComment[0].id;
  const findReplyArrIndex = await replyDao.findReplyIndex(newReplyId, feed_id);
  const page = Math.ceil(findReplyArrIndex / limit);
  const result = await getListOfRepliesByFeed(user_id, feed_id, page);

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
  return { createdNewComment, result, mailInfo };
};

const updateReply = async (
  user_id: number,
  reply_id: number,
  comment: string,
  is_private?: boolean
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

  if (isReply.comment === comment && isReply.private === is_private) {
    throw { status: 400, message: 'NO_CHANGE' };
  }

  is_private = is_private ?? false;
  const statusValue = `, is_private = ${is_private}`;

  const createdNewComment = await replyDao.updateReply(
    reply_id,
    comment,
    statusValue
  );

  const newReplyId: number = createdNewComment[0].id;
  const feedId: number = createdNewComment[0].feed_id;
  const findReplyArrIndex = await replyDao.findReplyIndex(newReplyId, feedId);
  const page = Math.ceil(findReplyArrIndex / limit);

  const result = await getListOfRepliesByFeed(user_id, feedId, page);

  return { createdNewComment, result };
};

const deleteReply = async (user_id: number, reply_id: number) => {
  const [isReply] = await replyDao.findReply(reply_id);
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
