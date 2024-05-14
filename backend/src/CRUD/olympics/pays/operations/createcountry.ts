import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Country } from '../../interfaces';


export async function createCountry(Country: Country): Promise<Country | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const countries = db.collection<Country>("countries");

    try {
        const result = await countries.insertOne(Country);
        if (result.insertedId) {
            return await countries.findOne({_id: result.insertedId}) as Country;
        } else {
            return "Failed to create Country.";
        }
    } catch (error) {
        console.error("Failed to create Country:", error);
        throw error;
    } finally {
        await client.close();
    }
}
