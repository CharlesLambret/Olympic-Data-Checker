import { MongoConnection } from '../../../db/call';
import bcrypt from 'bcrypt';

export async function updateAdmin(email: string, name: string, password: string, isAdmin: boolean) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const adminData = {
            email: email,
            name: name,
            passwordHash: passwordHash,
            isAdmin: true
        };

        const existing = await users.findOne({ email: email });
        if (!existing) {
            return "Admin does not exist.";
        }

        await users.updateOne({ email: email }, { $set: adminData });
        return "Admin updated successfully.";
    } catch (error) {
        console.error("Update admin failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
