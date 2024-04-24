import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Athlete } from '../../interfaces';


export async function deleteAthlete(athleteId: ObjectId): Promise<boolean> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletes = db.collection<Athlete>("athletes");

    try {
        const result = await athletes.deleteOne({_id: new ObjectId(athleteId)});
        return result.deletedCount === 1;
    } catch (error) {
        console.error("Failed to delete athlete:", error);
        throw error;
    } finally {
        await client.close();
    }
}
