import { MongoConnection } from '../../../../db/call';
import bcrypt from 'bcrypt';

export async function login(email: string, password: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const user = await users.findOne({ email: email });
        if (!user) {
            return { success: false, message: "User not found." };
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return { success: false, message: "Invalid password." };
        }

        return { success: true, message: "Login successful.", _id: user._id };
    } catch (error) {
        console.error("Login failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
