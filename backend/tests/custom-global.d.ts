import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var __MONGOSERVER__: MongoMemoryServer;
}
