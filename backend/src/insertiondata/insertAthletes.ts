import express from 'express';
import { MongoConnection } from '../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creerathlete = express.Router();

creerathlete.post('/upload-athletes', async (req, res) => {
    try {
        const client = await MongoConnection();
        const db = client.db("TP-React");
        const athletes = db.collection("athletes");
        const countries = db.collection("countries");

        await athletes.createIndex({ Nom: 1, Discipline: 1, PaysID: 1 }, { unique: true });

        const countryMap = new Map<string, ObjectId>();
        const allCountries = await countries.find({}).toArray();
        allCountries.forEach((country: { region: string; _id: ObjectId; }) => {
            countryMap.set(country.region, country._id);
        });

        const parser = createReadStream('./athlete_events.csv').pipe(parse({
            columns: true,
            skip_empty_lines: true
        }));

        const athletesData: any[] = [];
        const BATCH_SIZE = 1000;
        let batch: any[] = [];

        parser.on('readable', () => {
            let record: any;
            while ((record = parser.read())) {
                if (record.Medal !== 'NA') {
                    const countryId = countryMap.get(record.Team.trim());
                    if (countryId) {
                        batch.push({
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
                    if (batch.length >= BATCH_SIZE) {
                        athletes.insertMany(batch, { ordered: false })
                            .then(result => console.log(`Inserted ${result.insertedCount} athletes`))
                            .catch(error => console.error('Batch insert error:', error));
                        batch = [];
                    }
                }
            }
        });

        parser.on('end', async () => {
            if (batch.length > 0) {
                athletes.insertMany(batch, { ordered: false })
                    .then(result => console.log(`Inserted ${result.insertedCount} athletes`))
                    .catch(error => console.error('Final batch insert error:', error));
            }
            console.log("Finished processing CSV data.");
            res.status(201).send("Athlete data upload completed successfully.");
        });

        parser.on('error', (error: Error) => {
            console.error('Failed to parse CSV data:', error);
            res.status(500).send("Failed to parse CSV data.");
        });

    } catch (error) {
        console.error('Error in uploading athletes:', error);
        res.status(500).send("Error in uploading athletes.");
    }
});

export default creerathlete;
