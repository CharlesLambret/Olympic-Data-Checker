import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Game } from '../../interfaces';

export async function updateGame(gameId: ObjectId, updatedGame: Game): Promise<Game | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const games = db.collection<Game>("jeux");

    try {
        const result = await games.updateOne({_id: new ObjectId(gameId)}, {$set: updatedGame});
        if (result.modifiedCount > 0) {
            return await games.findOne({_id: new ObjectId(gameId)}) as Game;
        } else {
            return "Failed to update game.";
        }
    } catch (error) {
        console.error("Failed to update game:", error);
        throw error;
    } finally {
        await client.close();
    }
}
