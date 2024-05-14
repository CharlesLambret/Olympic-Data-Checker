import express, { Request, Router } from "express";
import { deleteMedal } from "../operations/deletemedal";
import { ObjectId } from "mongodb";

export const deletMedal = express.Router();

deletMedal.delete('/deletemedal/:id', async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    
    try {
        const result = await deleteMedal(objectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Medal not found.");
        }
    } catch (error: any) {
        console.error("Failed to delete medal:", error);
        res.status(500).send("Failed to delete medal: " + error.message);
    }
});
