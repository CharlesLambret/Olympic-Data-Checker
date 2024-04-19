import { MongoConnection } from '../../../../db/call';

export async function readAdminById(id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const admin = await users.findOne({ id: id, isAdmin: true });
        if (!admin) {
            return "Admin not found.";
        }

        return admin;
    } catch (error) {
        console.error("Read admin by id failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}

export async function readAdmins() {
    const client = await MongoConnection();
    const db = client.db("TP-React"); 
    const users = db.collection("users");

    try {
        const admins = await users.find({ isAdmin: true }).toArray();
        if (admins.length === 0) {
            return "No admins found.";
        }

        return admins;
    } catch (error) {
        console.error("Read all admins failed:", error);
        throw error; 
    } finally {
        await client.close(); 
    }
}
