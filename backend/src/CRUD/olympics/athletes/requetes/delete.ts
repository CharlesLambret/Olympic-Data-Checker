import express, { Request, Router } from "express";
import { deleteAthlete } from "../operations/deleteathlete";
import { ObjectId } from "mongodb";
import { Athlete } from "../../interfaces";

export const deleteathlete = express.Router();

deleteathlete.delete('/deleteathlete/:id', async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    try {
        const result = await deleteAthlete(objectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Athlete not found.");
        }
    } catch (error: any) {
        console.error("Failed to delete athlete:", error);
        res.status(500).send("Failed to delete athlete: " + error.message);
    }
});
