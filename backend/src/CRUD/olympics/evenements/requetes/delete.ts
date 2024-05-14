import express, { Request, Router } from "express";
import { deleteEvent } from "../operations/deleteevent";
import { ObjectId } from "mongodb";

export const deletEvent = express.Router();

deletEvent.delete('/deleteevent/:id', async (req, res) => {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    
    try {
        const result = await deleteEvent(objectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Event not found.");
        }
    } catch (error: any) {
        console.error("Failed to delete event:", error);
        res.status(500).send("Failed to delete event: " + error.message);
    }
});
