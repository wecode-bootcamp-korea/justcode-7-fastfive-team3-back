import { Request, Response } from 'express';
import postingService from '../services/postingService';
import { checkRequireKeys } from '../utils/util';
import { Feed } from '../types/feed';

const createFeed = async (req: Request, res: Response) => {
  const userId: number = req.userInfo.id;
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
    categoryId,
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
    categoryId,
    title,
    logo,
    introduction,
    main_field,
    contact,
    branch,
  ];
  checkRequireKeys(REQUIRE_KEYS);

  await postingService.createFeed(
    userId,
    categoryId,
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

const updateFeed = async (req: Request, res: Response) => {
  const userId: number = req.userInfo.id;
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
    categoryId,
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
    categoryId,
    title,
    logo,
    introduction,
    main_field,
    contact,
    branch,
  ];
  checkRequireKeys(REQUIRE_KEYS);

  await postingService.updateFeed(
    userId,
    categoryId,
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

  res.status(200).json({ message: 'Update Feed!', locationPath });
};

const getFeed = async (req: Request, res: Response) => {
  const userId: number = req.userInfo.id;
  const result = await postingService.getFeed(userId);

  res.status(200).json(result);
};

const createTemporarySaveFeed = async (req: Request, res: Response) => {
  const userId: number = req.userInfo.id;
  console.log(req.files);

  if (!(req.files === undefined)) {
    const files = req.files as Express.MulterS3.File[];
    const locationPath = files.map(path => path.location);
    const namePath = files.map(path => path.originalname);
    const sizePath = files.map(path => path.size);
    const logo = locationPath[0] || null;
    const file = locationPath[1] || null;
    const fileName = namePath[1] || null;
    const logoSize = sizePath[0] || null;
    const fileSize = sizePath[1] || null;
    const categoryId: number | null = req.body.categoryId || null;
    const title: string | null = req.body.title || null;
    const introduction: string | null = req.body.introduction || null;
    const main_field: string | null = req.body.main_field || null;
    const contact: string | null = req.body.contact || null;
    const branch: string | null = req.body.branch || null;
    const hompage: string | null = req.body.hompage || null;
    const detail_introduction: string | null =
      req.body.detail_introduction || null;
    const member_benefit: string | null = req.body.member_benefit || null;

    await postingService.createTemporarySaveFeed(
      userId,
      categoryId,
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

    return res.status(201).json({ message: 'Complete Temporary Save!' });
  }
  if (req.files === undefined) {
    const logo: null = null;
    const file: null = null;
    const fileName: null = null;
    const logoSize: null = null;
    const fileSize: null = null;
    const categoryId: number | null = req.body.categoryId || null;
    const title: string | null = req.body.title || null;
    const introduction: string | null = req.body.introduction || null;
    const main_field: string | null = req.body.main_field || null;
    const contact: string | null = req.body.contact || null;
    const branch: string | null = req.body.branch || null;
    const hompage: string | null = req.body.hompage || null;
    const detail_introduction: string | null =
      req.body.detail_introduction || null;
    const member_benefit: string | null = req.body.member_benefit || null;

    await postingService.createTemporarySaveFeed(
      userId,
      categoryId,
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

    return res.status(201).json({ message: 'Complete Temporary Save!' });
  }
};

export default { createFeed, updateFeed, getFeed, createTemporarySaveFeed };
