import express from "express";
import { getCountryById, searchCountriesByName } from "../operations/readcountry";

export const getCountry = express.Router();

getCountry.get('/getcountries/', async (req, res) => {
    try {
        const name = req.query.name as string;
        const medals = await searchCountriesByName(name); 
        res.send(medals);
    } catch (error: any) {
        res.status(500).send("Failed to read medals: " + error.message);
    }
});

getCountry.get('/getcountry/:id', async (req, res) => {
    try {
        const id = req.params.id as string;
        const medal = await getCountryById(id); 
        res.send(medal);
    } catch (error: any) {
        res.status(500).send("Failed to read medal: " + error.message);
    }
});

export default getCountry;
