import express from "express";
import { ObjectId } from "mongodb";
import { createSport } from "../operations/createsport";
import { Sport } from '../../interfaces';

export const creatSport = express.Router();

creatSport.post('/creategame', async (req, res)  => {
    try {
        const { NomSport } = req.body as Sport;
        const newSport = {
            _id: new ObjectId(),  
            NomSport: NomSport,
        };
        const result = await createSport(newSport);
        res.status(201).send(result);
    } catch (error: any) {
        console.error("Failed to create Sport:", error);
        res.status(500).send("Failed to create Sport: " + error.message);
    }
});