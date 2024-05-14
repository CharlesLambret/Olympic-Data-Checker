import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Event } from '../../interfaces';

export async function updateEvent(eventId: ObjectId, updatedEvent: Event): Promise<Event | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection<Event>("evenements");

    try {
        const result = await events.updateOne({_id: new ObjectId(eventId)}, {$set: updatedEvent});
        if (result.modifiedCount > 0) {
            return await events.findOne({_id: new ObjectId(eventId)}) as Event;
        } else {
            return "Failed to update event.";
        }
    } catch (error) {
        console.error("Failed to update event:", error);
        throw error;
    } finally {
        await client.close();
    }
}
