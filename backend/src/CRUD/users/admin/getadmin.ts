import { MongoConnection } from '../../../db/call';

export async function readAdmin(id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const admins = await users.find({ id: id, isAdmin: true }).toArray();
        if (admins.length === 0) {
            return "Admins not found.";
        }

        return admins;
    } catch (error) {
        console.error("Read admin failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
