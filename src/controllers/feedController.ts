import { Request, Response } from 'express';
import feedService from '../services/feedService';
import { checkRequireKeys } from '../utils/util';
import { Feed } from '../types/feed';

const createFeed = async (req: Request, res: Response) => {
  const userId = req.userInfo.id;
  const files = req.files as Express.MulterS3.File[];
  const locationPath = files.map(path => path.location);
  const namePath = files.map(path => path.originalname);
  const sizePath = files.map(path => path.size);
  const logo = locationPath[0];
  const file = locationPath[1];
  const fileName = namePath[1];
  const logoSize = sizePath[0];
  const fileSize = sizePath[1];

  const {
    category,
    title,
    introduction,
    main_field,
    contact,
    branch,
    hompage,
    detail_introduction,
    member_benefit,
  }: Feed = req.body;

  const REQUIRE_KEYS = [
    category,
    title,
    logo,
    introduction,
    main_field,
    contact,
    branch,
  ];
  checkRequireKeys(REQUIRE_KEYS);

  await feedService.createFeed(
    userId,
    category,
    title,
    logo,
    logoSize,
    introduction,
    main_field,
    contact,
    branch,
    hompage,
    detail_introduction,
    member_benefit,
    file,
    fileName,
    fileSize
  );

  res.status(201).json({ message: 'Create Feed!', locationPath });
};

export default { createFeed };
