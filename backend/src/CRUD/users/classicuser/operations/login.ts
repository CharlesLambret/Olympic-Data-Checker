
import { MongoConnection } from '../../../../db/call';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginResult } from '../../interfaces';

dotenv.config();

export async function login(email: string, password: string): Promise<LoginResult> {
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
        const userID = user._id.toString();
        const token = jwt.sign({ _id: userID, email: user.email }, process.env.JWT_SECRET || 'default-secret', { expiresIn: '1h' });
        
        return { success: true, message: "Login successful.", token: token, _id : userID, email: user.email};
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    } finally {
        await client.close();
    }
}
