import replyService from '../services/replyService';
import { Request, Response } from 'express';
import { checkRequireKeys } from '../utils/util';

const getListOfRepliesByFeed = async (req: Request, res: Response) => {
  let feed_id: number = Number(req.params.feed_id);
  const result = await replyService.getListOfRepliesByFeed(feed_id);

  res.status(200).json(result);
};

type requireKeys = {
  feed_id: number;
  comment: string;
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
export default { getListOfRepliesByFeed, createReply };
