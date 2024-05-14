import express, { Request, Router } from "express";
import { updateMedal } from "../operations/updatemedal";
import { ObjectId } from "mongodb";
import { Medal } from "../../interfaces";


export const updatMedal = express.Router();

updatMedal.put('/updatemedal/:id', async (req, res)   => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const updateData: Medal = {
        ...req.body,
        _id: objectId
    };
    try {
        const result = await updateMedal(objectId, updateData);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Medal not found.");
        }
    } catch (error: any) {
        console.error("Failed to update medal:", error);
        res.status(500).send("Failed to update medal: " + error.message);
    }
});