import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Event } from '../../interfaces';


export async function deleteEvent(eventId: ObjectId): Promise<boolean> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection<Event>("evenements");

    try {
        const result = await events.deleteOne({_id: new ObjectId(eventId)});
        return result.deletedCount === 1;
    } catch (error) {
        console.error("Failed to delete event:", error);
        throw error;
    } finally {
        await client.close();
    }
}
