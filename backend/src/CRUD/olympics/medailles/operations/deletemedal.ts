import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Medal } from '../../interfaces';


export async function deleteMedal(medalId: ObjectId): Promise<boolean> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medals = db.collection<Medal>("evenements");

    try {
        const result = await medals.deleteOne({_id: new ObjectId(medalId)});
        return result.deletedCount === 1;
    } catch (error) {
        console.error("Failed to delete medal:", error);
        throw error;
    } finally {
        await client.close();
    }
}
