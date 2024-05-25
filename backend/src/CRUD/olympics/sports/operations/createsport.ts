import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Sport } from '../../interfaces';


export async function createSport(Sport: Sport): Promise<Sport | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const Sports = db.collection<Sport>("sports");

    try {
        const result = await Sports.insertOne(Sport);
        if (result.insertedId) {
            return await Sports.findOne({_id: result.insertedId}) as Sport;
        } else {
            return "Failed to create Sport.";
        }
    } catch (error) {
        console.error("Failed to create Sport:", error);
        throw error;
    } finally {
        await client.close();
    }
}
