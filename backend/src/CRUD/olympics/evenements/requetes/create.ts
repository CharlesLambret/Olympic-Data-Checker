import express from "express";
import { ObjectId } from "mongodb";
import { createEvent } from "../operations/createveent";
import { Event } from '../../interfaces';

export const creatEvent = express.Router();

creatEvent.post('/createEvent', async (req, res)  => {
    try {
        const { Discipline, NomEvent, JeuxID } = req.body as Event;
        const newEvent = {
            _id: new ObjectId(),  
            Discipline,
            NomEvent,
            JeuxID: new ObjectId(JeuxID)  
        };
        const result = await createEvent(newEvent);
        res.status(201).send(result);
    } catch (error: any) {
        console.error("Failed to create event:", error);
        res.status(500).send("Failed to create event: " + error.message);
    }
});