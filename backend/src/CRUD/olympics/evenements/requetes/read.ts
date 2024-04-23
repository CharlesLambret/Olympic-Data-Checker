import express from "express";
import { getEventById, searchEventsByName } from "../operations/getevent";

const getEvent = express.Router();

getEvent.get('/getevents', async (req, res) => {
    try {
        const eventName = req.query.name as string; 
        const events = await searchEventsByName(eventName); 
        res.send(events);
    } catch (error: any) {
        res.status(500).send("Failed to read events: " + error.message);
    }
});

getEvent.get('/getevent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const event = await getEventById(id); 
        res.send(event);
    } catch (error: any) {
        res.status(500).send("Failed to read event: " + error.message);
    }
});

export default getEvent;
