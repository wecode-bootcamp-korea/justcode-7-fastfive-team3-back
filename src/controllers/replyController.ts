import replyService from '../services/replyService';
import { Request, Response } from 'express';
import { checkRequireKeys } from '../utils/util';
import { sendMailForNewReply } from '../utils/sendMailForNewReply';

const getListOfRepliesByFeed = async (req: Request, res: Response) => {
  let userId: number = req.userInfo.id;
  let feedId: number = Number(req.params.feed_id);
  let page: number = Number(req.query.page);

  const result = await replyService.getListOfRepliesByFeed(
    userId,
    feedId,
    page
  );
  res.status(200).json(result);
};

type requireKeys = {
  feed_id?: number;
  comment?: string;
  reply_id?: number;
};
const createReply = async (req: Request, res: Response) => {
  const userId: number = req.userInfo.id;
  const feedId: number = Number(req.body.feed_id);
  const comment: string = String(req.body.comment);
  const parentReplyId: number = Number(req.body.parent_reply_id);
  const isPrivate: boolean = Boolean(req.body.is_private);

  const REQUIRED_KEYS: requireKeys = {
    feed_id: feedId,
    comment,
  };

  checkRequireKeys(REQUIRED_KEYS);

  const result = await replyService.crateReply(
    userId,
    feedId,
    comment,
    parentReplyId,
    isPrivate
  );

  const receiverName = result.mailInfo.userName;
  const receiverMail = result.mailInfo.userMail;
  const senderName = result.mailInfo.replyUser;

  sendMailForNewReply(receiverMail, receiverName, senderName, comment);

  res.status(201).json(result.result);
};

const updateReply = async (req: Request, res: Response) => {
  const user_id: number = req.userInfo.id;
  const reply_id: number = Number(req.body.reply_id);
  const comment: string = String(req.body.comment);
  const is_private: boolean = Boolean(req.body.is_private);

  const REQUIRED_KEYS: requireKeys = {
    reply_id,
    comment,
  };

  checkRequireKeys(REQUIRED_KEYS);

  const result = await replyService.updateReply(
    user_id,
    reply_id,
    comment,
    is_private
  );

  res.status(201).json(result);
};

const deleteReply = async (req: Request, res: Response) => {
  const user_id: number = req.userInfo.id;
  const reply_id: number = Number(req.body.reply_id);

  const REQUIRED_KEYS: requireKeys = {
    reply_id,
  };

  checkRequireKeys(REQUIRED_KEYS);

  const result = await replyService.deleteReply(user_id, reply_id);

  res.status(200).json(result);
};
export default {
  getListOfRepliesByFeed,
  createReply,
  updateReply,
  deleteReply,
};
