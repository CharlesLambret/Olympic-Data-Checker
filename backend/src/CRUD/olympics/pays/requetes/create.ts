import express from "express";
import { ObjectId } from "mongodb";
import { createCountry } from "../operations/createcountry";
import { Country } from '../../interfaces';

export const creatCountry = express.Router();

creatCountry.post('/createcountries', async (req, res)  => {
    try {
        const { noc, region, notes } = req.body as Country;
        const newCountry = {
            _id: new ObjectId(),  
            noc,
            region,
            notes 
        };
        const result = await createCountry(newCountry);
        res.status(201).send(result);
    } catch (error: any) {
        console.error("Failed to create countries:", error);
        res.status(500).send("Failed to create countries: " + error.message);
    }
});
