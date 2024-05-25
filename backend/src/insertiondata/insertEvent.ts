import express, { Request, Response } from 'express';
import { MongoConnection } from '../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creerevenements = express.Router();

creerevenements.post('/upload-evenements', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const evenementsCollection = db.collection("evenements");
    const jeuxCollection = db.collection("jeux");
    const sportsCollection = db.collection("sports");

    const jeuxMap = new Map<string, ObjectId>();
    const sportMap = new Map<string, ObjectId>();

    try {
        // Chargement des jeux et création d'une map
        const allJeux = await jeuxCollection.find({}).toArray();
        allJeux.forEach(jeu => {
            const key = `${jeu.Annee}-${jeu.Ville.trim().toLowerCase()}`;
            jeuxMap.set(key, jeu._id);
        });

        // Chargement des sports et création d'une map
        const allSports = await sportsCollection.find({}).toArray();
        allSports.forEach(sport => {
            if (sport.NomSport) {
                sportMap.set(sport.NomSport.trim().toLowerCase(), sport._id);
            } else {
                console.warn(`Sport document missing NomSport: ${JSON.stringify(sport)}`);
            }
        });
    } catch (error) {
        console.error("Error loading games or sports:", error);
        res.status(500).send("Failed to load necessary collections.");
        return;
    }

    const evenements: { 
        NomEvent: string, 
        JeuxID: ObjectId, 
        SportID: ObjectId, 
        _id: ObjectId 
    }[] = [];

    const parser = createReadStream('./events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const jeuxKey = `${record.Year}-${record.City.trim().toLowerCase()}`;
            const sportKey = record.Sport.trim().toLowerCase();

            const jeuxID = jeuxMap.get(jeuxKey);
            const sportID = sportMap.get(sportKey);

            if (jeuxID && sportID) {
                const evenement = {
                    NomEvent: record.Event ? record.Event.trim() : '',
                    JeuxID: jeuxID,
                    SportID: sportID,
                    _id: new ObjectId()
                };
                evenements.push(evenement);
            } else {
                console.error(`Missing game or sport mapping for record: ${JSON.stringify(record)}`);
                if (!jeuxID) {
                    console.error(`Missing game ID for Year: ${record.Year}, City: ${record.City}`);
                }
                if (!sportID) {
                    console.error(`Missing sport ID for Sport: ${record.Sport}`);
                }
            }
        }
    });

    parser.on('end', async () => {
        try {
            const result = await evenementsCollection.insertMany(evenements, { ordered: false });
            console.log(`Inserted ${result.insertedCount} evenements`);
            res.status(201).send(`Inserted ${result.insertedCount} evenements`);
        } catch (err) {
            console.error('Batch insert error:', err);
            res.status(500).send("Failed to insert evenements.");
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creerevenements;
