import express, { Request, Response } from 'express';
import { MongoConnection } from '../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creersports = express.Router();

creersports.post('/upload-sports', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const sportsCollection = db.collection("sports");

    const sports: { NomSport: string, _id: ObjectId }[] = [];

    const parser = createReadStream('./sports.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const sport = {
                NomSport: record.Sport.trim(),
                _id: new ObjectId()
            };
            sports.push(sport);
        }
    });

    parser.on('end', async () => {
        try {
            const result = await sportsCollection.insertMany(sports, { ordered: false });
            console.log(`Inserted ${result.insertedCount} sports`);
            res.status(201).send(`Inserted ${result.insertedCount} sports`);
        } catch (err) {
            console.error('Batch insert error:', err);
            res.status(500).send("Failed to insert sports.");
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creersports;
