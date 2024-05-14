import express, { Request, Router } from "express";
import { updateAthlete } from "../operations/updathlete";
import { ObjectId } from "mongodb";
import { Athlete } from "../../interfaces";



export const updateathlete = express.Router();

updateathlete.put('/updateathlete/:id', async (req, res)   => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const updateData: Athlete = {
        ...req.body,
        _id: objectId
    };
    try {
        const result = await updateAthlete(objectId, updateData);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Athlete not found.");
        }
    } catch (error: any) {
        console.error("Failed to update athlete:", error);
        res.status(500).send("Failed to update athlete: " + error.message);
    }
});