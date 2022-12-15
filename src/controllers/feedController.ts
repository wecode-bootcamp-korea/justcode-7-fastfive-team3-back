import { Request, Response } from 'express'
import * as feedService from '../services/feedService'
import { Feed } from '../types/feed'

export const createFeed = async (req :Request, res :Response) => {
  try {
    const files = req.files as Express.MulterS3.File[]
    const path = files.map((path) => path.location);
    const logo = path[0]
    const file = path[1]

    const {
      category,
      title,
      introduction,
      main_field,
      contact,
      branch,
      detail_category,
      hompage,
      detail_introduction,
      member_benefit,
    } : Feed = req.body
    //TODO 유저아이디 받아와야함 const userId =req.userId
    const REQUIRE_KEYS = [
      category,
      title,
      logo,
      introduction,
      main_field,
      contact,
      branch
    ];

      Object.keys(REQUIRE_KEYS).map((key :string) => {
        if (!(REQUIRE_KEYS[key as keyof typeof REQUIRE_KEYS])) {
          throw new Error(`KEY_ERROR: ${key}`);
        }
      });

      await feedService.createFeed (
        //userId
        category,
        title,
        logo,
        introduction,
        main_field,
        contact,
        branch,
        detail_category,
        hompage,
        detail_introduction,
        member_benefit,
        file,
        );

    res.status(201).json({ message: 'Create Feed!', path });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message : 'Can Not Upload!' });
  };
}

