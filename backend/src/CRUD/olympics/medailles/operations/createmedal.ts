import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Medal } from '../../interfaces';


export async function createMedal(Medal: Medal): Promise<Medal | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medals = db.collection<Medal>("medailles");

    try {
        const result = await medals.insertOne(Medal);
        if (result.insertedId) {
            return await medals.findOne({_id: result.insertedId}) as Medal;
        } else {
            return "Failed to create Medal.";
        }
    } catch (error) {
        console.error("Failed to create Medal:", error);
        throw error;
    } finally {
        await client.close();
    }
}
