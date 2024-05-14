import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Medal } from '../../interfaces';

export async function updateMedal(medalId: ObjectId, updatedMedal: Medal): Promise<Medal | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medals = db.collection<Medal>("evenements");

    try {
        const result = await medals.updateOne({_id: new ObjectId(medalId)}, {$set: updatedMedal});
        if (result.modifiedCount > 0) {
            return await medals.findOne({_id: new ObjectId(medalId)}) as Medal;
        } else {
            return "Failed to update medal.";
        }
    } catch (error) {
        console.error("Failed to update medal:", error);
        throw error;
    } finally {
        await client.close();
    }
}
