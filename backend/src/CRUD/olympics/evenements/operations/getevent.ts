import { ParsedQs } from 'qs';
import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';

export async function getEventById(id: string | number) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection("evenements");

    try {
        const event = await events.findOne({ _id: new ObjectId(id) });
        if (!event) {
            return "Event not found.";
        }
        return event;
    } catch (error) {
        console.error("Failed to fetch event by ID:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function searchEventsByName(eventName: string ) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection("evenements");
    console.log('un élément du tableau event :', await events.findOne())
    try {
        console.log(`Searching for events with name: ${eventName}`);  
        const eventsList = await events.find({ NomEvent: { $regex: new RegExp(eventName, 'i') }}).toArray();
        if (eventsList.length === 0) {
            console.log("No events found with that name."); 
            return "No events found.";
        }
        return eventsList;
    } catch (error) {
        console.error("Failed to search events:", error);
        throw error;
    } finally {
        await client.close();
    }
}
