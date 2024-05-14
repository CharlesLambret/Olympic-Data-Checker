import express, { Request, Router } from "express";
import { deleteGame } from "../operations/deletegame";
import { ObjectId } from "mongodb";

export const deletGame = express.Router();

deletGame.delete('/deletegame/:id', async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    
    try {
        const result = await deleteGame(objectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Game not found.");
        }
    } catch (error: any) {
        console.error("Failed to delete game:", error);
        res.status(500).send("Failed to delete game: " + error.message);
    }
});
