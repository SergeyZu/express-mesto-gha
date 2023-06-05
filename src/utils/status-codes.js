const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  MONGO_DUPLICATE_KEY_ERROR: 11000,
};

module.exports = STATUS_CODES;
