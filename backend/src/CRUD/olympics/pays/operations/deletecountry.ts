import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Medal } from '../../interfaces';


export async function deleteMedal(countryId: ObjectId): Promise<boolean> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const countries = db.collection<Medal>("evenements");

    try {
        const result = await countries.deleteOne({_id: new ObjectId(countryId)});
        return result.deletedCount === 1;
    } catch (error) {
        console.error("Failed to delete country:", error);
        throw error;
    } finally {
        await client.close();
    }
}
