import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Sport } from '../../interfaces';

export async function updateSport(id: ObjectId, NomSport: string): Promise<Sport | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const sports = db.collection<Sport>("sports");

    try {
        const result = await sports.updateOne({_id: new ObjectId(id)}, {NomSport: NomSport});
        if (result.modifiedCount > 0) {
            return await sports.findOne({_id: new ObjectId(id)}) as Sport;
        } else {
            return "Failed to update sport.";
        }
    } catch (error) {
        console.error("Failed to update sport:", error);
        throw error;
    } finally {
        await client.close();
    }
}
