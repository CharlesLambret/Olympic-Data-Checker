import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
    namespace NodeJS {
        interface Global {
            __MONGOSERVER__: MongoMemoryServer;
        }
    }
}
