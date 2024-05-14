import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Event } from '../../interfaces';


export async function createEvent(Event: Event): Promise<Event | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection<Event>("evenements");

    try {
        const result = await events.insertOne(Event);
        if (result.insertedId) {
            return await events.findOne({_id: result.insertedId}) as Event;
        } else {
            return "Failed to create Event.";
        }
    } catch (error) {
        console.error("Failed to create Event:", error);
        throw error;
    } finally {
        await client.close();
    }
}
