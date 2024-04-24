import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creermedailles = express.Router();

creermedailles.post('/upload-medailles', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medailles = db.collection("medailles");
    const athletes = db.collection("athletes");
    const events = db.collection("evenements");
    
    const athleteMap = new Map<string, ObjectId>();
    const eventMap = new Map<string, ObjectId>();

    // Retrieve all athletes and events to map names/IDs
    const allAthletes = await athletes.find({}).toArray();
    allAthletes.forEach(athlete => {
        athleteMap.set(athlete.Nom.trim(), athlete._id);
    });

    const allEvents = await events.find({}).toArray();
    allEvents.forEach(event => {
        const eventKey = `${event.NomEvent.trim()}-${event.JeuxID}`;
        eventMap.set(eventKey, event._id);
    });

    // CSV parser setup
    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const athleteID = athleteMap.get(record.Name.trim());
            const eventKey = `${record.Event.trim()}-${record.Year}`;
            const eventID = eventMap.get(eventKey);

            if (athleteID && eventID) {
                medailles.insertOne({
                    NomMedaille: record.Medal === 'NA' ? 'La valeur pour la médaille n\'est pas renseignée dans le jeu de données' : record.Medal.trim(),
                    EventID: eventID,
                    AthleteID: athleteID
                }).catch(err => {
                    console.error('Error inserting medal:', err);
                });
            }
        }
    });

    parser.on('end', async () => {
        console.log("Finished processing CSV data.");
        res.status(201).send("Processing complete. Total medals processed.");
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creermedailles;
