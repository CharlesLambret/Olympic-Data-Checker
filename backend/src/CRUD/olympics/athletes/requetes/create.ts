import express from "express";
import { ObjectId } from "mongodb";
import { createAthlete } from "../operations/createathlete";
import { Athlete } from "../../interfaces";


export const createathlete = express.Router();

createathlete.post('/createathlete', async (req, res)  => {
    try {
        const { Nom, Discipline, Age, Poids, Taille, Sexe, PaysID } = req.body as Athlete;
        const newAthlete = {
            _id: new ObjectId(),  
            Nom,
            Discipline,
            Age,
            Poids,
            Taille,
            Sexe,
            PaysID: new ObjectId(PaysID)  
        };
        const result = await createAthlete(newAthlete);
        res.status(201).send(result);
    } catch (error: any) {
        console.error("Failed to create athlete:", error);
        res.status(500).send("Failed to create athlete: " + error.message);
    }
});