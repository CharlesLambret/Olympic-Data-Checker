import express, { Request, Router } from "express";
import { updateCountry } from "../operations/updatecountry";
import { ObjectId } from "mongodb";
import { Country } from "../../interfaces";


export const updatCountry = express.Router();

updatCountry.put('/updatecountry/:id', async (req, res)   => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const updateData: Country = {
        ...req.body,
        _id: objectId
    };
    try {
        const result = await updateCountry(objectId, updateData);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Country not found.");
        }
    } catch (error: any) {
        console.error("Failed to update country:", error);
        res.status(500).send("Failed to update country: " + error.message);
    }
});