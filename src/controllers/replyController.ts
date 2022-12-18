import replyService from '../services/replyService';
import { Request, Response } from 'express';
import { checkRequireKeys } from '../utils/util';

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

  const REQUIRED_KEYS: requireKeys = {
    feed_id,
    comment,
  };

  checkRequireKeys(REQUIRED_KEYS);

  const result = await replyService.crateReply(
    user_id,
    feed_id,
    comment,
    parent_reply_id
  );

  res.status(200).json(result);
};

const updateReply = async (req: Request, res: Response) => {
  let user_id: number = req.userInfo.id;
  let reply_id: number = Number(req.body.reply_id);
  let comment: string = String(req.body.comment);
  let status: boolean = Boolean(req.body.status);

  const REQUIRED_KEYS: requireKeys = {
    reply_id,
    comment,
  };

  checkRequireKeys(REQUIRED_KEYS);

  console.log('status =', status);

  const result = await replyService.updateReply(
    user_id,
    reply_id,
    comment,
    status
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
