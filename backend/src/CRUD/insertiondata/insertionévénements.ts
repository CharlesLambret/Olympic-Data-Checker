import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

const creermedailles = express.Router();

type Medaille = {
    _id: ObjectId;
    NomMedaille: string;
    EventID: ObjectId;
    AthleteID: ObjectId;
};

creermedailles.post('/upload-medals', async (req: Request, res: Response) => {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const jeux = db.collection("jeux");
    const evenements = db.collection("événements");
    const athletes = db.collection("athletes");
    const medailles = db.collection<Medaille>("medailles");

    const allJeux = await jeux.find({}).toArray();
    const allEvents = await evenements.find({}).toArray();
    const allAthletes = await athletes.find({}).toArray();

    const jeuxMap = new Map<string, ObjectId>();
    const eventMap = new Map<string, ObjectId>();
    const athleteMap = new Map<string, ObjectId>();

    allJeux.forEach(jeu => {
        jeuxMap.set(`${jeu.Ville}-${jeu.Annee}`, jeu._id);
    });
    allEvents.forEach(event => {
        eventMap.set(`${event.NomEvent}-${event.JeuxID.toString()}`, event._id);
    });
    allAthletes.forEach(athlete => {
        athleteMap.set(athlete.Nom, athlete._id);
    });

    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    let medalCounter = 0;  
    let debugCount = 0;     

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            medalCounter++; 
            const jeuxKey = `${record.City.trim()}-${record.Year.trim()}`;
            const jeuxID = jeuxMap.get(jeuxKey);
            const eventKey = `${record.Event.trim()}-${jeuxID}`;
            const eventID = eventMap.get(eventKey);
            const athleteKey = record.Name.trim();
            const athleteID = athleteMap.get(athleteKey);

            if (debugCount < 20) {
                console.log(`Médaille n°${medalCounter}: Searching for JeuxID with key: '${jeuxKey}' found: ${jeuxID}`);
                console.log(`Médaille n°${medalCounter}: Searching for EventID with key: '${eventKey}' found: ${eventID}`);
                console.log(`Médaille n°${medalCounter}: Searching for AthleteID with name: '${athleteKey}' found: ${athleteID}`);
                debugCount++;
            }

            if (eventID && athleteID) {
                medailles.insertOne({
                    _id: new ObjectId(),
                    NomMedaille: record.Medal.trim() === 'NA' ? 'Valeur non renseignée dans le dataset' : record.Medal.trim(),
                    EventID: eventID,
                    AthleteID: athleteID
                });
            }
        }
    });

    parser.on('end', async () => {
        console.log("Finished processing CSV data.");
        res.status(201).send("Processing complete. Total medals processed: " + medalCounter);
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

export default creermedailles;
