import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Athlete } from '../../interfaces';

export async function createAthlete(athlete: Athlete): Promise<Athlete | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletes = db.collection<Athlete>("athletes");

    try {
        const result = await athletes.insertOne(athlete);
        if (result.insertedId) {
            return await athletes.findOne({_id: result.insertedId}) as Athlete;
        } else {
            return "Failed to create athlete.";
        }
    } catch (error) {
        console.error("Failed to create athlete:", error);
        throw error;
    } finally {
        await client.close();
    }
}
