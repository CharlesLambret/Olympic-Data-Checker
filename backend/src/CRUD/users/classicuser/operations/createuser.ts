import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function createUser(email: string, name: string, password: string, isAdmin: boolean) {
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

        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return "User already exists.";
        }

        await users.insertOne(userData);
        return "User created successfully.";
    } catch (error) {
        console.error("Create user failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
