import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creerathlete = express.Router();

type Athlete = {
    _id: ObjectId;
    Nom: string;
    Discipline: string;
    Age: number | null;
    Poids: number | null;
    Taille: number | null;
    Sexe: string;
    PaysID: ObjectId;
};

creerathlete.post('/upload-athletes', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletes = db.collection<Athlete>("athletes");
    const countries = db.collection("countries");

    await athletes.createIndex({ Nom: 1, Discipline: 1, PaysID: 1 }, { unique: true });

    const countryMap = new Map<string, ObjectId>();
    const allCountries = await countries.find({}).toArray();
    allCountries.forEach(country => {
        countryMap.set(country.region, country._id);
    });

    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    const athletesData: Athlete[] = [];

    parser.on('readable', () => {
        let record;
        while (record = parser.read()) {
            const countryId = countryMap.get(record.Team.trim());
            if (countryId) {
                athletesData.push({
                    _id: new ObjectId(),
                    Nom: record.Name.trim(),
                    Discipline: record.Sport.trim(),
                    Age: record.Age === 'NA' ? null : parseInt(record.Age),
                    Poids: record.Weight === 'NA' ? null : parseInt(record.Weight),
                    Taille: record.Height === 'NA' ? null : parseInt(record.Height),
                    Sexe: record.Sex.trim(),
                    PaysID: countryId
                });
            }
        }
    });

    parser.on('end', async () => {
        if (athletesData.length > 0) {
            try {
                const result = await athletes.insertMany(athletesData, { ordered: false });
                console.log(`Successfully inserted ${result.insertedCount} athletes.`);
                res.status(201).send(`${result.insertedCount} athletes successfully inserted.`);
            } catch (error: any) {
                if (error.code === 11000) { 
                    console.error('Duplicate athlete entries were not inserted.');
                    res.status(409).send('Some athletes could not be inserted due to duplicates.');
                } else {
                    console.error('Failed to insert athletes:', error);
                    res.status(500).send('Failed to insert athletes due to a server error.');
                }
            } finally {
                await client.close();
            }
        } else {
            console.log("No athletes to insert, skipping database operation.");
            res.status(400).send("No athletes data to insert, check your data or matching logic.");
            await client.close();
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creerathlete;
