import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
export async function getAthleteById(id: string | number) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletes = db.collection("athletes");

    try {
        const athlete = await athletes.findOne({ _id: new ObjectId(id) });
        if (!athlete) {
            return "Athlete not found.";
        }
        return athlete;
    } catch (error) {
        console.error("Failed to fetch athlete by ID:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function searchAthletesByName(name: any) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletes = db.collection("athletes");

    try {
        const athletesList = await athletes.find({ Nom: { $regex: name, $options: 'i' }}).toArray();
        if (athletesList.length === 0) {
            return "No athletes found.";
        }
        return athletesList;
    } catch (error) {
        console.error("Failed to search athletes by name:", error);
        throw error;
    } finally {
        await client.close();
    }
}
