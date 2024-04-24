import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { Document, ObjectId, OptionalId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creermedailles = express.Router();

creermedailles.post('/upload-medailles', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medailles = db.collection("medailles");
    const athletes = db.collection("athletes");
    const events = db.collection("evenements");
    const games = db.collection("jeux");

    const athleteMap = new Map<string, ObjectId>();
    const eventMap = new Map<string, ObjectId>();
    const gameMap = new Map<string, ObjectId>();

    try {
        const allAthletes = await athletes.find({}).toArray();
        allAthletes.forEach(athlete => {
            athleteMap.set(athlete.Nom.trim(), athlete._id);
        });

        const allGames = await games.find({}).toArray();
        allGames.forEach(game => {
            const gameKey = `${game.Ville.trim()}-${game.Annee}`;
            gameMap.set(gameKey, game._id);
        });

        const allEvents = await events.find({}).toArray();
        allEvents.forEach(event => {
            const eventKey = `${event.NomEvent.trim()}-${event.JeuxID}`;
            eventMap.set(eventKey, event._id);
        });
    } catch (error) {
        console.error("Error loading athletes, games or events:", error);
        res.status(500).send("Failed to load necessary collections.");
        return;
    }

    const BATCH_SIZE = 500;
    let batch: OptionalId<Document>[] | { NomMedaille: any; EventID: ObjectId; AthleteID: ObjectId; }[] = [];

    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            if (record.Medal !== 'NA') { // Only process entries where Medal is not 'NA'
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
                        batch = []; // Clear batch after insertion
                    }
                } else {
                    console.error(`Missing athlete or event mapping for record: ${JSON.stringify(record)}`);
                }
            }
        }
    });

    parser.on('end', async () => {
        if (batch.length > 0) { // Insert remaining medals in the final batch
            medailles.insertMany(batch, { ordered: false })
                .then(result => console.log(`Inserted ${result.insertedCount} medals`))
                .catch(err => console.error('Final batch insert error:', err));
        }
        console.log(`Finished processing CSV data. Total medals processed: ${batch.length}`);
        res.status(201).send(`Processing complete. Total medals processed: ${batch.length}`);
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creermedailles;
