import express from "express";
import { getSportById, searchSportsByName } from "../operations/readsport";
import { ObjectId } from "mongodb";

export const getSport = express.Router();

getSport.get('/getsports', async (req, res) => {
    try {
        const name = req.body.name ; 
        const sports = await searchSportsByName(name); 
        res.send(sports);
    } catch (error: any) {
        res.status(500).send("Failed to read sports: " + error.message);
    }
});

getSport.get('/getsport/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sport = await getSportById(id); 
        res.send(sport);
    } catch (error: any) {
        res.status(500).send("Failed to read sport: " + error.message);
    }
});

export default getSport;
