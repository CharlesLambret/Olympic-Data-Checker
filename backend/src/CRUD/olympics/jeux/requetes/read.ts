import express from "express";
import { getGameById, searchGamesByYear } from "../operations/readgame";
import { ObjectId } from "mongodb";

export const getGame = express.Router();

getGame.get('/getgames', async (req, res) => {
    try {
        const year = req.body.year ; 
        const games = await searchGamesByYear(year); 
        res.send(games);
    } catch (error: any) {
        res.status(500).send("Failed to read games: " + error.message);
    }
});

getGame.get('/getgame/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const game = await getGameById(id); 
        res.send(game);
    } catch (error: any) {
        res.status(500).send("Failed to read game: " + error.message);
    }
});

export default getGame;
