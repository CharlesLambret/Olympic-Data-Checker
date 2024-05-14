import express, { Request, Router } from "express";
import { deleteCountry } from "../operations/deletecountry";
import { ObjectId } from "mongodb";

export const deletCountry = express.Router();

deletCountry.delete('/deletecountry/:id', async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    
    try {
        const result = await deleteCountry(objectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Country not found.");
        }
    } catch (error: any) {
        console.error("Failed to delete country:", error);
        res.status(500).send("Failed to delete country: " + error.message);
    }
});
