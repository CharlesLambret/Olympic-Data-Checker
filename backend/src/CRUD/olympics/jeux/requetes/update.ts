import express, { Request, Router } from "express";
import { updateGame } from "../operations/updategame";
import { ObjectId } from "mongodb";
import { Game } from "../../interfaces";


export const updatGame = express.Router();

updatGame.put('/updategame/:id', async (req, res)   => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const updateData: Game = {
        ...req.body,
        _id: objectId
    };
    try {
        const result = await updateGame(objectId, updateData);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Game not found.");
        }
    } catch (error: any) {
        console.error("Failed to update game:", error);
        res.status(500).send("Failed to update game: " + error.message);
    }
});