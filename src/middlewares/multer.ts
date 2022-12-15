import multer from 'multer';
import multerS3 from 'multer-s3';
// import aws from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3'

// aws.config.loadFromPath(__dirname + '/../config/s3.json');

const upload = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials : {
        accessKeyId: process.env.S3_Access_Key_Id as string,
        secretAccessKey: process.env.S3_Secret_AccessKey as string,
      },
      region : process.env.S3_Region
    }),
    bucket: 'fastfiveproject',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
});

export default upload