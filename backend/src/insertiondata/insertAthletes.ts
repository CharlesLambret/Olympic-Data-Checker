import express, { Request, Response } from 'express';
import { MongoConnection } from '../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creerathletes = express.Router();

creerathletes.post('/upload-athletes', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletesCollection = db.collection("athletes");
    const countriesCollection = db.collection("countries");
    const sportsCollection = db.collection("sports");

    const countryMap = new Map<string, ObjectId>();
    const sportMap = new Map<string, ObjectId>();

    try {
        // Chargement des pays et création d'une map
        const allCountries = await countriesCollection.find({}).toArray();
        allCountries.forEach(country => {
            if (country.noc) {
                countryMap.set(country.noc.trim().toUpperCase(), country._id);
            } else {
                console.warn(`Country document missing NOC: ${JSON.stringify(country)}`);
            }
        });

        // Chargement des sports et création d'une map
        const allSports = await sportsCollection.find({}).toArray();
        allSports.forEach(sport => {
            if (sport.NomSport) {
                sportMap.set(sport.NomSport.trim(), sport._id);
            } else {
                console.warn(`Sport document missing NomSport: ${JSON.stringify(sport)}`);
            }
        });
    } catch (error) {
        console.error("Error loading countries or sports:", error);
        res.status(500).send("Failed to load necessary collections.");
        return;
    }

    const athletes: { 
        Nom: string, 
        PaysID: ObjectId, 
        SportID: ObjectId, 
        Age?: number, 
        Taille?: number, 
        Poids?: number, 
        Sexe: string, 
        _id: ObjectId 
    }[] = [];

    const parser = createReadStream('./cleanathletes.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const countryID = countryMap.get(record.NOC ? record.NOC.trim().toUpperCase() : '');
            const sportID = sportMap.get(record.Sport ? record.Sport.trim() : '');

            if (countryID && sportID) {
                const athlete = {
                    Nom: record.Name ? record.Name.trim() : '',
                    PaysID: countryID,
                    SportID: sportID,
                    Age: record.Age ? parseFloat(record.Age) : undefined,
                    Taille: record.Height ? parseFloat(record.Height) : undefined,
                    Poids: record.Weight ? parseFloat(record.Weight) : undefined,
                    Sexe: record.Sex ? record.Sex.trim() : '',
                    _id: new ObjectId()
                };
                athletes.push(athlete);
            } else {
                console.error(`Missing country or sport mapping for record: ${JSON.stringify(record)}`);
            }
        }
    });

    parser.on('end', async () => {
        try {
            const result = await athletesCollection.insertMany(athletes, { ordered: false });
            console.log(`Inserted ${result.insertedCount} athletes`);
            res.status(201).send(`Inserted ${result.insertedCount} athletes`);
        } catch (err) {
            console.error('Batch insert error:', err);
            res.status(500).send("Failed to insert athletes.");
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creerathletes;
