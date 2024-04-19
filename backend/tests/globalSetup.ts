const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  global.__MONGOSERVER__ = await MongoMemoryServer.create();
  process.env.MONGO_URI = global.__MONGOSERVER__.getUri();
};
