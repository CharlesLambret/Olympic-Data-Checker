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
    const BATCH_SIZE = 1000; // Taille du lot d'insertion
    let batch: { _id: ObjectId; Nom: any; Discipline: any; Age: number | null; Poids: number | null; Taille: number | null; Sexe: any; PaysID: ObjectId; }[] = [];
    
    parser.on('readable', () => {
        let record;
        while ((record = parser.read())) {
            if (record.Medal !== 'NA') { // Filtre les entrées sans médaille
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
                    batch = []; // Réinitialiser le lot après l'insertion
                }
            }
        }
    });
    
    parser.on('end', async () => {
        if (batch.length > 0) { // Insérer le dernier lot si nécessaire
            athletes.insertMany(batch, { ordered: false })
                .then(result => console.log(`Inserted ${result.insertedCount} athletes`))
                .catch(error => console.error('Final batch insert error:', error));
        }
        console.log("Finished processing CSV data.");
        res.status(201).send("Athlete data upload completed successfully.");
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creerathlete;
