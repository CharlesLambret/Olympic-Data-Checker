import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';

export async function getSportById(id: string | number) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const Sports = db.collection("sports");

    try {
        const Sport = await Sports.findOne({ _id: new ObjectId(id) });
        if (!Sport) {
            return "Sport not found.";
        }
        return Sport;
    } catch (error) {
        console.error("Failed to fetch Sport by ID:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function searchSportsByName(name: string ) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const Sports = db.collection("sports");
    try {
        console.log(`Searching for Sports associated with name ${name}`);  
        const SportsList = await Sports.find({ NomSport : { name }}).toArray();
        if (SportsList.length === 0) {
            console.log("No Sports associated with this name found."); 
            return "No Sports found.";
        }
        return SportsList;
    } catch (error) {
        console.error("Failed to search Sports:", error);
        throw error;
    } finally {
        await client.close();
    }
}
