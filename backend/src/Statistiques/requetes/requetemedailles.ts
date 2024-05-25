import express from 'express';
import { getTotalMedailles } from '../operations/totalmedailles';

export const statsmedailles = express.Router();

statsmedailles.get('/total-medailles/', async (req, res) => {
    const id = req.query.id as string;
    const type = req.query.type as string;

    if (!id) {
        return res.status(400).json({ error: 'ID is a required parameter' });
    }

    if (type !== 'athlete' && type !== 'pays') {
        return res.status(400).json({ error: 'Invalid type parameter. Only "athlete" and "pays" are allowed.' });
    }

    try {
        const result = await getTotalMedailles(id, type);
        res.json(result);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});
