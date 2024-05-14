import express from "express";
import { ObjectId } from "mongodb";
import { createMedal } from "../operations/createmedal";
import { Medal } from '../../interfaces';

export const creatMedal = express.Router();

creatMedal.post('/createmedal', async (req, res)  => {
    try {
        const { AthleteID, EventID, NomMedaille } = req.body as Medal;
        const newMedal = {
            _id: new ObjectId(),  
            AthleteID : new ObjectId(AthleteID),
            EventID : new ObjectId(EventID),
            NomMedaille 
        };
        const result = await createMedal(newMedal);
        res.status(201).send(result);
    } catch (error: any) {
        console.error("Failed to create medal:", error);
        res.status(500).send("Failed to create medal: " + error.message);
    }
});