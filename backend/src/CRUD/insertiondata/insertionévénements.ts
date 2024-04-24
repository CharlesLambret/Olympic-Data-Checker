import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { Document, ObjectId, OptionalId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { error } from 'console';

export const creerevenements = express.Router();

creerevenements.post('/upload-events', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const events = db.collection("evenements");
    const jeux = db.collection("jeux");

    const jeuxMap = new Map<string, ObjectId>();

    const allGames = await jeux.find({}).toArray();
    allGames.forEach(game => {
        const gameKey = `${game.Annee}-${game.Saison}`;
        jeuxMap.set(gameKey, game._id);
    });

    await events.createIndex({ "JeuxID": 1, "NomEvent": 1 }, { unique: true });

    const BATCH_SIZE = 1000;
    let batch: OptionalId<Document>[] | { _id: ObjectId; Discipline: any; NomEvent: any; JeuxID: ObjectId; }[] = [];

    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            if (record.Medal !== 'NA') {  // Ne traiter que les événements où une médaille a été attribuée
                const jeuxKey = `${record.Year}-${record.Season}`;
                const jeuxID = jeuxMap.get(jeuxKey);

                if (jeuxID) {
                    batch.push({
                        _id: new ObjectId(),
                        Discipline: record.Sport.trim(),
                        NomEvent: record.Event.trim(),
                        JeuxID: jeuxID
                    });

                    if (batch.length >= BATCH_SIZE) {
                        events.insertMany(batch, { ordered: false })
                            .then(result => console.log(`Inserted ${result.insertedCount} events`))
                            .catch(error => console.error('Batch insert error:', error));
                        batch = [];  // Réinitialiser le lot après l'insertion
                    }
                }
            }
        }
    });

    parser.on('end', () => {
        if (batch.length > 0) {  // Insérer le dernier lot si nécessaire
            events.insertMany(batch, { ordered: false })
                .then(result => console.log(`Inserted ${result.insertedCount} events`))
                .catch(error => console.error('Final batch insert error:', error));
        }
        console.log("All events have been processed.");
        res.status(201).send("Event data upload completed successfully.");
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to process CSV data.");
    });
});
