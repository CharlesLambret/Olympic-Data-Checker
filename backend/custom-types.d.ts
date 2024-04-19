import { ObjectId } from 'mongodb';

declare module 'express-session' {
  export interface SessionData {
    userId?: ObjectId; 
  }
}
