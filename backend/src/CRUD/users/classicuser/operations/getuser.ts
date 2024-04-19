import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';

export async function getUserById(id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const foundUser = await users.findOne({ _id: new ObjectId(id), isAdmin: false });
        if (!foundUser) {
            return "User not found.";
        }

        return foundUser;
    } catch (error) {
        console.error("Failed to get user:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}

export async function getUsers() {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const foundUsers = await users.find({ isAdmin: false }).toArray();
        return foundUsers;
    } catch (error) {
        console.error("Failed to get users:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}