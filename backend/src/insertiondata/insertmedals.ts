import express, { Request, Response } from 'express';
import { MongoConnection } from '../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creermedailles = express.Router();

creermedailles.post('/upload-medailles', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medaillesCollection = db.collection("medailles");
    const athletesCollection = db.collection("athletes");
    const countriesCollection = db.collection("countries");
    const jeuxCollection = db.collection("jeux");
    const evenementsCollection = db.collection("evenements");

    const athleteMap = new Map<string, ObjectId>();
    const countryMap = new Map<string, ObjectId>();
    const jeuxMap = new Map<string, ObjectId>();
    const eventMap = new Map<string, ObjectId>();

    try {
        // Chargement des athlètes et création d'une map
        const allAthletes = await athletesCollection.find({}).toArray();
        allAthletes.forEach(athlete => {
            athleteMap.set(athlete.Nom.trim().toLowerCase(), athlete._id);
        });

        // Chargement des pays et création d'une map
        const allCountries = await countriesCollection.find({}).toArray();
        allCountries.forEach(country => {
            if (country.noc) {
                countryMap.set(country.noc.trim().toUpperCase(), country._id);
            } else {
                console.warn(`Country document missing NOC: ${JSON.stringify(country)}`);
            }
        });

        // Chargement des jeux et création d'une map
        const allJeux = await jeuxCollection.find({}).toArray();
        allJeux.forEach(jeu => {
            const key = `${jeu.Annee}-${jeu.Ville.trim().toLowerCase()}`;
            jeuxMap.set(key, jeu._id);
        });

        // Chargement des événements et création d'une map
        const allEvents = await evenementsCollection.find({}).toArray();
        allEvents.forEach(event => {
            const key = `${event.NomEvent.trim().toLowerCase()}-${event.JeuxID}`;
            eventMap.set(key, event._id);
        });
    } catch (error) {
        console.error("Error loading athletes, countries, games or events:", error);
        res.status(500).send("Failed to load necessary collections.");
        return;
    }

    const medailles: { 
        NomMedaille: string, 
        AthleteID: ObjectId, 
        PaysID: ObjectId, 
        EventID: ObjectId, 
        _id: ObjectId 
    }[] = [];

    const parser = createReadStream('./medals.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const athleteID = athleteMap.get(record.Name ? record.Name.trim().toLowerCase() : '');
            const countryID = countryMap.get(record.NOC ? record.NOC.trim().toUpperCase() : '');
            const jeuxKey = `${record.Year}-${record.City.trim().toLowerCase()}`;
            const jeuxID = jeuxMap.get(jeuxKey);
            const eventKey = `${record.Event.trim().toLowerCase()}-${jeuxID}`;
            const eventID = eventMap.get(eventKey);

            if (athleteID && countryID && jeuxID && eventID) {
                const medaille = {
                    NomMedaille: record.Medal ? record.Medal.trim() : '',
                    AthleteID: athleteID,
                    PaysID: countryID,
                    EventID: eventID,
                    _id: new ObjectId()
                };
                medailles.push(medaille);
            } else {
                console.error(`Missing mapping for record: ${JSON.stringify(record)}`);
                if (!athleteID) {
                    console.error(`Missing athlete ID for Name: ${record.Name}`);
                }
                if (!countryID) {
                    console.error(`Missing country ID for NOC: ${record.NOC}`);
                }
                if (!jeuxID) {
                    console.error(`Missing game ID for Year: ${record.Year}, City: ${record.City}`);
                }
                if (!eventID) {
                    console.error(`Missing event ID for Event: ${record.Event}, JeuxID: ${jeuxID}`);
                }
            }
        }
    });

    parser.on('end', async () => {
        try {
            const result = await medaillesCollection.insertMany(medailles, { ordered: false });
            console.log(`Inserted ${result.insertedCount} medailles`);
            res.status(201).send(`Inserted ${result.insertedCount} medailles`);
        } catch (err) {
            console.error('Batch insert error:', err);
            res.status(500).send("Failed to insert medailles.");
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creermedailles;
