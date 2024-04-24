import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Athlete } from '../../interfaces';

export async function updateAthlete(athleteId: ObjectId, updatedAthlete: Athlete): Promise<Athlete | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletes = db.collection<Athlete>("athletes");

    try {
        const result = await athletes.updateOne({_id: new ObjectId(athleteId)}, {$set: updatedAthlete});
        if (result.modifiedCount > 0) {
            return await athletes.findOne({_id: new ObjectId(athleteId)}) as Athlete;
        } else {
            return "Failed to update athlete.";
        }
    } catch (error) {
        console.error("Failed to update athlete:", error);
        throw error;
    } finally {
        await client.close();
    }
}
