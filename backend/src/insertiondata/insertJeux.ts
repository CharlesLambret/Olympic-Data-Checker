import express, { Request, Response } from 'express';
import { MongoConnection } from '../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creerjeux = express.Router();

creerjeux.post('/upload-jeux', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const jeuxCollection = db.collection("jeux");

    const jeux: { 
        Annee: number,
        Saison: string,
        Ville: string,
        _id: ObjectId 
    }[] = [];

    const parser = createReadStream('./jeux.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const jeu = {
                Annee: record.Year ? parseInt(record.Year) : 0,
                Saison: record.Season ? record.Season.trim() : '',
                Ville: record.City ? record.City.trim() : '',
                _id: new ObjectId()
            };
            jeux.push(jeu);
        }
    });

    parser.on('end', async () => {
        try {
            const result = await jeuxCollection.insertMany(jeux, { ordered: false });
            console.log(`Inserted ${result.insertedCount} jeux`);
            res.status(201).send(`Inserted ${result.insertedCount} jeux`);
        } catch (err) {
            console.error('Batch insert error:', err);
            res.status(500).send("Failed to insert jeux.");
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creerjeux;
