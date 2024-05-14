import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Country } from '../../interfaces';

export async function updateCountry(countryId: ObjectId, updatedCountry: Country): Promise<Country | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const countrys = db.collection<Country>("countries");

    try {
        const result = await countrys.updateOne({_id: new ObjectId(countryId)}, {$set: updatedCountry});
        if (result.modifiedCount > 0) {
            return await countrys.findOne({_id: new ObjectId(countryId)}) as Country;
        } else {
            return "Failed to update country.";
        }
    } catch (error) {
        console.error("Failed to update country:", error);
        throw error;
    } finally {
        await client.close();
    }
}
