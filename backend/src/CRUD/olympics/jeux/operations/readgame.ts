import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';

export async function getGameById(id: string | number) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const games = db.collection("jeux");

    try {
        const game = await games.findOne({ _id: new ObjectId(id) });
        if (!game) {
            return "Game not found.";
        }
        return game;
    } catch (error) {
        console.error("Failed to fetch game by ID:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function searchGamesByYear(year: number ) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const games = db.collection("jeux");
    console.log('un élément du tableau game :', await games.findOne())
    try {
        console.log(`Searching for games associated with athlete ${year}`);  
        const gamesList = await games.find({ Annee : { year }}).toArray();
        if (gamesList.length === 0) {
            console.log("No games associated with this athlete found."); 
            return "No games found.";
        }
        return gamesList;
    } catch (error) {
        console.error("Failed to search games:", error);
        throw error;
    } finally {
        await client.close();
    }
}
