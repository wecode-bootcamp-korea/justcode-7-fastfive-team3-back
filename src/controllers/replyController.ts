import replyService from '../services/replyService';
import { Request, Response } from 'express';
import { checkRequireKeys } from '../utils/util';
import nodemailer from 'nodemailer';

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
  const mailComment = result.result[0].comment;

  // send mail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: `"millie.service Team" <${process.env.NODEMAILER_USER}>`,
    to: `${receiverMail}`,
    subject: '[FastFive] 새로운 덧글이 등록되었습니다. ',
    html: `
    <p style="text-align: center;"><span style="font-size: 36px;"><strong>FastFive</strong></span></p>
    <hr />
    <blockquote>
    <p style="text-align: center;">새로운 덧글 등록 안내메일.</p>
    </blockquote>
    <p style="text-align: left;"><span style="font-size: 20px;"><span style="font-family: -apple-system, BlinkMacSystemFont, Malgun Gothic, 맑은 고딕, helvetica, Apple SD Gothic Neo, helvetica, 나눔바른고딕 옛한글, NanumBarunGothic YetHangul, sans-serif;"><span style="font-size: 13px;">안녕하세요, ${receiverName}님</span></span></span></p>
    <p style="text-align: left;"><span style="font-size: 20px;">${senderName}님께서 새로운 덧글을 남겼어요!!</span></p>
    <p><span style="font-size: 36px; background-color: #d1d5d8;">${mailComment}</span></p>
    <hr />
    <p><span style="font-size: 10px;">본 메일은 발신전용이며, 문의에 대한 회신은 처리되지 않습니다. </span></p>
    `,
  });

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

  console.log('is_private =', is_private);

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
