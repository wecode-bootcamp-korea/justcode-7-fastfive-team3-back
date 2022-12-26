import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const upload = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: {
        accessKeyId: process.env.S3_Access_Key_Id,
        secretAccessKey: process.env.S3_Secret_AccessKey,
      },
      region: 'ap-northeast-2',
    }),
    bucket: 'fastfiveproject',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
});

export default upload;
