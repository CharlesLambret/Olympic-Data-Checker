import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { error } from 'console';

export const creerevenements = express.Router();

creerevenements.post('/upload-events', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection("evenements");
    const jeux = db.collection("jeux");

    // Prepare to map games with events
    const jeuxMap = new Map<string, ObjectId>();

    // Retrieve all games to map them by year and season
    const allGames = await jeux.find({}).toArray();
    allGames.forEach(game => {
        const gameKey = `${game.Annee}-${game.Saison}`;
        jeuxMap.set(gameKey, game._id);
    });

    // Ensure uniqueness of events for each games edition
    await events.createIndex({ "JeuxID": 1, "NomEvent": 1 }, { unique: true });

    // CSV parser setup
    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const jeuxKey = `${record.Year}-${record.Season}`;
            const jeuxID = jeuxMap.get(jeuxKey);

            if (jeuxID) {
                events.insertOne({
                    _id: new ObjectId(),
                    Discipline: record.Sport.trim(),
                    NomEvent: record.Event.trim(),
                    JeuxID: jeuxID
                }).catch(error => {
                    console.error('Error inserting document:', error);
                });
            }
        }
    });

    parser.on('end', () => {
        console.log("All events have been processed.");
        res.status(201).send("Event data upload completed successfully.");
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to process CSV data.");
    });
});
