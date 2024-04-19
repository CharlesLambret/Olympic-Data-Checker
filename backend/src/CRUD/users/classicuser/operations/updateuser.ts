import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function updateUser(userId: string, email: string, name: string, password: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const userData = {
            email: email,
            name: name,
            passwordHash: passwordHash
        };

        const existing = await users.findOne({ _id: new ObjectId(userId) });
        if (!existing) {
            return "User does not exist.";
        }

        if (existing.isAdmin) {
            return "Operation not allowed for admin users.";
        }

        await users.updateOne({ _id: new ObjectId(userId) }, { $set: userData });
        return "User updated successfully.";
    } catch (error) {
        console.error("Update user failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
