import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';

export async function deleteUser(id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const existing = await users.findOne({ _id: new ObjectId(id) });
        if (!existing) {
            return "User does not exist.";
        }

        await users.deleteOne({ _id: new ObjectId(id) });
        return "User deleted successfully.";
    } catch (error) {
        console.error("Delete user failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}