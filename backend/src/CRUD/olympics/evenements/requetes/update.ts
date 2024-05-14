import express, { Request, Router } from "express";
import { updateEvent } from "../operations/updateevent";
import { ObjectId } from "mongodb";
import { Event } from "../../interfaces";



export const updatEvent = express.Router();

updatEvent.put('/updateevent/:id', async (req, res)   => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const updateData: Event = {
        ...req.body,
        _id: objectId
    };
    try {
        const result = await updateEvent(objectId, updateData);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Event not found.");
        }
    } catch (error: any) {
        console.error("Failed to update event:", error);
        res.status(500).send("Failed to update event: " + error.message);
    }
});