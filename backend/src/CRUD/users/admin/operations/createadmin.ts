import { ObjectId } from 'mongodb';
import { MongoConnection } from '../../../../db/call';
import bcrypt from 'bcrypt';

export async function createAdmin(email: string, name: string, password: string, isAdmin: boolean) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const adminData = {
            _id: new ObjectId(), 
            email: email,
            name: name,
            passwordHash: passwordHash,
            isAdmin: true
        };

        const existing = await users.findOne({ email: email });
        if (existing) {
            return "Admin already exists.";
        }

        await users.insertOne(adminData);
        return "Admin created successfully.";
    } catch (error) {
        console.error("Create admin failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
