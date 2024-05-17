import express from 'express';
import { TotalMedailles, TotalMedaillesByType } from '../operations/totalmedailles';

export const statsmedailles = express.Router();

statsmedailles.get('/total-medailles/', async (req, res) => {
    try {
        const { type, id } = req.query;

        if (!type || !id) {
            return res.status(400).json({ error: 'Type and ID are required parameters' });
        }

        const totalMedals = await TotalMedailles(type as string, id as string);
        return res.json({ totalMedals });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

statsmedailles.get('/total-medailles-by-type/', async (req, res) => {
    try {
        const { type, id } = req.query;

        if (!type || !id) {
            return res.status(400).json({ error: 'Type and ID are required parameters' });
        }

        const medalsByType = await TotalMedaillesByType(type as string, id as string);
        return res.json({ medalsByType });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});
