import express from "express";
import { getTopCountries } from "../operations/topcountries";

export const topcountries = express.Router();

topcountries.get('/top-pays/', async (req, res) => {
    try {
        const nombredepays = Number(req.query.nombredepays);
        const year = Number(req.query.year);
        const season = req.query.season?.toString();
        const medalType = req.query.medalType?.toString();

        if (nombredepays && medalType) { 
            const result = await getTopCountries(nombredepays, year, season, medalType);
            res.json(result);
        } else {
            res.status(400).json({ error: 'Missing type or id parameter' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});