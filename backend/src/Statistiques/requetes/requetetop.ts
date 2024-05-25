import express from "express";
import { getTopCountries } from "../operations/topcountries";

export const topcountries = express.Router();

topcountries.get('/top-pays/', async (req, res) => {
    try {
        const nombredepays = Number(req.query.nombredepays);
        const year = req.query.year ? Number(req.query.year) : undefined;
        const season = req.query.season?.toString();
        const medalType = req.query.medalType?.toString();


        if (!Number.isInteger(nombredepays) || nombredepays <= 0) {
            console.error('Invalid "nombredepays" parameter');
            return res.status(400).json({ error: 'Invalid "nombredepays" parameter' });
        }

        if (year && !Number.isInteger(year)) {
            console.error('Invalid "year" parameter');
            return res.status(400).json({ error: 'Invalid "year" parameter' });
        }

        if (season && (season !== 'Summer' && season !== 'Winter')) {
            console.error('Invalid "season" parameter');
            return res.status(400).json({ error: 'Invalid "season" parameter' });
        }

        const adjustedMedalType = (medalType && medalType.toLowerCase() === 'all') ? undefined : medalType;

        const result = await getTopCountries(nombredepays, year, season, adjustedMedalType);
        res.json(result);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});
