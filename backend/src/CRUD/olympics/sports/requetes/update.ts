import express, { Request, Router } from "express";
import { updateSport } from "../operations/updatesport";
import { ObjectId } from "mongodb";
import { Sport } from "../../interfaces";


export const updatSport = express.Router();

updatSport.put('/updategame/:id', async (req, res)   => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const nomSport= req.body.NomSport;
    try {
        const result = await updateSport(objectId, nomSport);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Sport not found.");
        }
    } catch (error: any) {
        console.error("Failed to update game:", error);
        res.status(500).send("Failed to update game: " + error.message);
    }
});