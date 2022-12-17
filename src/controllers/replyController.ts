import replyService from '../services/replyService';
import { Request, Response } from 'express';

const getListOfRepliesByFeed = async (req: Request, res: Response) => {
  let feed_id: number = Number(req.params.feed_id);
  const result = await replyService.getListOfRepliesByFeed(feed_id);

  res.status(200).json(result);
};

export default { getListOfRepliesByFeed };
