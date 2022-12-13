import { ErrorRequestHandler } from 'express';

const checkRequireKeys = (REQUIRE_KEYS: any) => {
  Object.keys(REQUIRE_KEYS).map((key: any) => {
    if (!REQUIRE_KEYS[key]) {
      throw { status: 400, message: `KEY_ERROR: ${key}` };
    }
  });
};

const errHandler: ErrorRequestHandler = (err, _1, res, _2) => {
  let errInfo = err;
  if (err.sqlMessage) {
    errInfo = { message: 'failed', status: 500, ...err };
  }
  res.status(errInfo.status || 500).json({ message: errInfo.message || '' });
};

export { checkRequireKeys, errHandler };
