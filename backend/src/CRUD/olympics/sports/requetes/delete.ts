import express, { Request, Router } from "express";
import { deleteSport } from "../operations/deletesport";
import { ObjectId } from "mongodb";

export const deletSport = express.Router();

deletSport.delete('/deletesport/:id', async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    
    try {
        const result = await deleteSport(objectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Sport not found.");
        }
    } catch (error: any) {
        console.error("Failed to delete sport:", error);
        res.status(500).send("Failed to delete sport: " + error.message);
    }
});
