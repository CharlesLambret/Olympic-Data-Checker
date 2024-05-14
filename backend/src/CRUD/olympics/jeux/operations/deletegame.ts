import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Game } from '../../interfaces';


export async function deleteGame(gameId: ObjectId): Promise<boolean> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const games = db.collection<Game>("jeux");

    try {
        const result = await games.deleteOne({_id: new ObjectId(gameId)});
        return result.deletedCount === 1;
    } catch (error) {
        console.error("Failed to delete game:", error);
        throw error;
    } finally {
        await client.close();
    }
}
