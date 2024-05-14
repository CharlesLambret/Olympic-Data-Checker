import express from "express";
import { getMedalById, searchMedalsByAthlete } from "../operations/readmedal";
import { ObjectId } from "mongodb";

export const getMedal = express.Router();

getMedal.get('/getmedals/:id', async (req, res) => {
    try {
        const athleteId = req.params.id ; 
        const medals = await searchMedalsByAthlete(athleteId); 
        res.send(medals);
    } catch (error: any) {
        res.status(500).send("Failed to read medals: " + error.message);
    }
});

getMedal.get('/getmedal/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const medal = await getMedalById(id); 
        res.send(medal);
    } catch (error: any) {
        res.status(500).send("Failed to read medal: " + error.message);
    }
});

export default getMedal;
