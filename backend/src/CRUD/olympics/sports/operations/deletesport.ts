import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Sport } from '../../interfaces';


export async function deleteSport(SportId: ObjectId): Promise<boolean> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const Sports = db.collection<Sport>("sports");

    try {
        const result = await Sports.deleteOne({_id: new ObjectId(SportId)});
        return result.deletedCount === 1;
    } catch (error) {
        console.error("Failed to delete Sport:", error);
        throw error;
    } finally {
        await client.close();
    }
}
