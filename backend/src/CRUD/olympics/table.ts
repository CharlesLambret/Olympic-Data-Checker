import { MongoConnection } from '../../db/call';

export async function getTable<T>(collectionName: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection<T>(collectionName);
}