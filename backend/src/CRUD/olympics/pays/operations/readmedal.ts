import { ParsedQs } from 'qs';
import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';

export async function getMedalById(id: string | number) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medals = db.collection("countries");

    try {
        const medal = await medals.findOne({ _id: new ObjectId(id) });
        if (!medal) {
            return "Medal not found.";
        }
        return medal;
    } catch (error) {
        console.error("Failed to fetch medal by ID:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function searchMedalsByAthlete(athleteID: string ) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medals = db.collection("countries");
    console.log('un élément du tableau medal :', await medals.findOne())
    try {
        console.log(`Searching for medals associated with athlete ${athleteID}`);  
        const medalsList = await medals.find({ AthleteID : { athleteID }}).toArray();
        if (medalsList.length === 0) {
            console.log("No medals associated with this athlete found."); 
            return "No medals found.";
        }
        return medalsList;
    } catch (error) {
        console.error("Failed to search medals:", error);
        throw error;
    } finally {
        await client.close();
    }
}
