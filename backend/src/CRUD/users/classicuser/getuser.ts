import { MongoConnection } from '../../../db/call';

export async function getUser(email: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const foundUsers = await users.find({ email }).toArray();
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
