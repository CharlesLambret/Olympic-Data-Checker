import express from 'express';
import { MongoConnection } from '../db/call';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creermedailles = express.Router();

creermedailles.post('/upload-medailles', async (req, res) => {
    try {
        const client = await MongoConnection();
        const db = client.db("TP-React");
        const medailles = db.collection("medailles");
        const athletes = db.collection("athletes");
        const athletesArray = await athletes.find().toArray();
        athletesArray.forEach((athlete: { Nom: string; _id: any }) => {
            const athleteData = athlete as { Nom: string; _id: any };
            athleteMap.set(athleteData.Nom.trim(), athleteData._id);
        });
        const eventMap = new Map<string, any>();
        events.forEach((event: { NomEvent: string; JeuxID: any; _id: any }) => {
            const eventKey = `${event.NomEvent.trim()}-${event.JeuxID}`;
            eventMap.set(eventKey, event._id);
        });

        const BATCH_SIZE = 500;
        let batch: any[] = [];

        const parser = createReadStream('./athlete_events.csv').pipe(parse({
            columns: true,
            skip_empty_lines: true
        }));

        parser.on('readable', () => {
            let record: any;
            while ((record = parser.read()) !== null) {
                if (record.Medal !== 'NA') {
                    const athleteID = athleteMap.get(record.Name.trim());
                    const gameKey = `${record.City.trim()}-${record.Year}`;
                    const gameID = gameMap.get(gameKey);
                    const eventKey = `${record.Event.trim()}-${gameID}`;
                    const eventID = eventMap.get(eventKey);
                    if (athleteID && eventID) {
                        batch.push({
                            NomMedaille: record.Medal.trim(),
                            EventID: eventID,
                            AthleteID: athleteID
                        });
                        if (batch.length >= BATCH_SIZE) {
                            medailles.insertMany(batch, { ordered: false })
                                .then(result => console.log(`Inserted ${result.insertedCount} medals`))
                                .catch(err => console.error('Batch insert error:', err));
                            batch = [];
                        }
                    } else {
                        console.error(`Missing athlete or event mapping for record: ${JSON.stringify(record)}`);
                    }
                }
            }
        });

        parser.on('end', async () => {
            if (batch.length > 0) {
                medailles.insertMany(batch, { ordered: false })
                    .then(result => console.log(`Inserted ${result.insertedCount} medals`))
                    .catch(err => console.error('Final batch insert error:', err));
            }
            console.log(`Finished processing CSV data. Total medals processed: ${batch.length}`);
            res.status(201).send(`Processing complete. Total medals processed: ${batch.length}`);
        });

        parser.on('error', (error: Error) => {
            console.error('Failed to parse CSV data:', error);
            res.status(500).send("Failed to parse CSV data.");
        });

    } catch (error) {
        console.error('Error in uploading medals:', error);
        res.status(500).send("Error in uploading medals.");
    }
});

export default creermedailles;
