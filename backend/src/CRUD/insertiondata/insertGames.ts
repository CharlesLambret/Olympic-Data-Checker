import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creerjeux = express.Router();

type Jeux = {
    _id: ObjectId;
    Annee: number;
    Saison: string;
    Ville: string;
};

creerjeux.post('/upload-games', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const jeux = db.collection<Jeux>("jeux");

    await jeux.createIndex({ Annee: 1, Saison: 1 }, { unique: true });

    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    const gamesData: Jeux[] = [];

    parser.on('readable', () => {
        let record;
        while (record = parser.read()) {
            gamesData.push({
                _id: new ObjectId(),
                Annee: parseInt(record.Year),
                Saison: record.Season.trim(),
                Ville: record.City.trim()
            });
        }
    });

    parser.on('end', async () => {
        try {
            const result = await jeux.insertMany(gamesData, { ordered: false });
            console.log(`Successfully inserted ${result.insertedCount} games.`);
            res.status(201).send(`${result.insertedCount} games successfully inserted.`);
        } catch (error) {
            console.error('Failed to insert games:', error);
            res.status(500).send('Some games could not be inserted due to duplicates or other issues.');
        } finally {
            await client.close();
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creerjeux;
