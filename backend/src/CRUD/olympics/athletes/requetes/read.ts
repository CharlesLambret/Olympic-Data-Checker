import express from "express";
import { MongoConnection } from "../../../../db/call";
import {getAthleteById, searchAthletesByName}   from "../operations/getathlete";

const getAthlete = express.Router();

getAthlete.get('/getathlete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const athlete = await getAthleteById(id);
        res.send(athlete);
    } catch (error: any) {
        res.status(500).send("Failed to read athlete: " + error.message);
    }
   
});


getAthlete.get('/getathletes', async (req, res) => {
    try {
        const name = req.query.name;
        const page = parseInt(req.query.page as string);
        const pageSize = parseInt(req.query.pageSize as string);
        if (typeof name === 'string' && !isNaN(page) && !isNaN(pageSize)) {
            const athletes = await searchAthletesByName(name, page, pageSize);
            res.send(athletes);
        } else {
            res.status(400).send("Invalid query parameters");
        }
    } catch (error: any) {
        res.status(500).send("Failed to read athletes: " + error.message);
    }
});

export default getAthlete;
