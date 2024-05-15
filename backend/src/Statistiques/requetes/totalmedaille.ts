import express from "express";
import { TotalMedaillesParPays } from "../operations/totalmedailles";

export const totalmedailles = express.Router();

totalmedailles.get('/total-medailles', async (req, res) => {
    try {
        const result = await TotalMedaillesParPays();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});