import { MongoConnection } from '../../../db/call';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function updateUser(email: string, name: string, password: string, isAdmin: boolean) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const userData = {
            _id: new ObjectId(), 
            email: email,
            name: name,
            passwordHash: passwordHash,
            isAdmin: false
        };

        const existing = await users.findOne({ email: email });
        if (!existing) {
            return "User does not exist.";
        }

        await users.updateOne({ email: email }, { $set: userData });
        return "User updated successfully.";
    } catch (error) {
        console.error("Update user failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
