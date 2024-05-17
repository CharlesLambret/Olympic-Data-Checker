import express from "express";
import { TotalMedailles } from "../operations/totalmedailles";

export const totalmedailles = express.Router();

totalmedailles.get('/total-medailles/', async (req, res) => {
    try {
        const type = req.query.type?.toString();
        const id = req.query.id?.toString();
        if (type && id) { 
            const result = await TotalMedailles(type, id);
            res.json(result);
        } else {
            res.status(400).json({ error: 'Missing type or id parameter' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});