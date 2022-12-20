import replyService from '../services/replyService';
import { Request, Response } from 'express';
import { checkRequireKeys } from '../utils/util';
import { sendMailForNewReply } from '../utils/sendMailForNewReply';

const getListOfRepliesByFeed = async (req: Request, res: Response) => {
  let user_id: number = req.userInfo.id;
  let feed_id: number = Number(req.params.feed_id);
  let page: number = Number(req.query.page);

  const result = await replyService.getListOfRepliesByFeed(
    user_id,
    feed_id,
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
  let user_id: number = req.userInfo.id;
  let feed_id: number = Number(req.body.feed_id);
  let comment: string = String(req.body.comment);
  let parent_reply_id: number = Number(req.body.parent_reply_id);
  let is_private: boolean = Boolean(req.body.is_private);

  const REQUIRED_KEYS: requireKeys = {
    feed_id,
    comment,
  };

  checkRequireKeys(REQUIRED_KEYS);

  const result = await replyService.crateReply(
    user_id,
    feed_id,
    comment,
    parent_reply_id,
    is_private
  );

  const receiverName = result.mailInfo.userName;
  const receiverMail = result.mailInfo.userMail;
  const senderName = result.mailInfo.replyUser;

  sendMailForNewReply(receiverMail, receiverName, senderName, comment);

  res.status(200).json(result);
};

const updateReply = async (req: Request, res: Response) => {
  let user_id: number = req.userInfo.id;
  let reply_id: number = Number(req.body.reply_id);
  let comment: string = String(req.body.comment);
  let is_private: boolean = Boolean(req.body.is_private);

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

  res.status(200).json(result);
};

const deleteReply = async (req: Request, res: Response) => {
  let user_id: number = req.userInfo.id;
  let reply_id: number = Number(req.body.reply_id);

  const REQUIRED_KEYS: requireKeys = {
    reply_id,
  };

  checkRequireKeys(REQUIRED_KEYS);

  await replyService.deleteReply(user_id, reply_id);

  res.status(200).json({ message: 'SUCCESSFULLY_DELETED_REPLY' });
};
export default {
  getListOfRepliesByFeed,
  createReply,
  updateReply,
  deleteReply,
};
