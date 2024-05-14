import express from "express";
import { ObjectId } from "mongodb";
import { createGame } from "../operations/creategame";
import { Game } from '../../interfaces';

export const creatGame = express.Router();

creatGame.post('/creategame', async (req, res)  => {
    try {
        const { Annee, Saison, Ville } = req.body as Game;
        const newGame = {
            _id: new ObjectId(),  
            Annee,
            Saison,
            Ville 
        };
        const result = await createGame(newGame);
        res.status(201).send(result);
    } catch (error: any) {
        console.error("Failed to create Game:", error);
        res.status(500).send("Failed to create Game: " + error.message);
    }
});