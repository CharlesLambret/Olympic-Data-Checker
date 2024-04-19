import { MongoConnection } from '../../../db/call';
import { ObjectId } from 'mongodb';

export async function getUser(id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const foundUsers = await users.find({ _id: new ObjectId(id), isAdmin: false }).toArray();
        if (foundUsers.length === 0) {
            return "User not found.";
        }

        return foundUsers;
    } catch (error) {
        console.error("Failed to get user:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}