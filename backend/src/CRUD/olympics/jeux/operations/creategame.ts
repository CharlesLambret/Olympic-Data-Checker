import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';  
import { Game } from '../../interfaces';


export async function createGame(Game: Game): Promise<Game | string> {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const games = db.collection<Game>("jeux");

    try {
        const result = await games.insertOne(Game);
        if (result.insertedId) {
            return await games.findOne({_id: result.insertedId}) as Game;
        } else {
            return "Failed to create Game.";
        }
    } catch (error) {
        console.error("Failed to create Game:", error);
        throw error;
    } finally {
        await client.close();
    }
}
