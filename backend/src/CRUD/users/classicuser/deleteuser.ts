import { MongoConnection } from '../../../db/call';

export async function deleteUser(email: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const existing = await users.findOne({ email: email });
        if (!existing) {
            return "Admin does not exist.";
        }

        await users.deleteOne({ email: email });
        return "Admin deleted successfully.";
    } catch (error) {
        console.error("Delete admin failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
