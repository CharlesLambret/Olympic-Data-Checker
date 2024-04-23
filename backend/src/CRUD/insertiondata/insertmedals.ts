import express, { Request, Response } from 'express';
import { MongoConnection } from '../../db/call';
import { Collection, Document, ObjectId } from 'mongodb';
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

    const jeuxMap = await buildMap(jeux, 'Ville-Annee');
    const eventMap = await buildMap(evenements, 'NomEvent-JeuxID');
    const athleteMap = await buildMap(athletes, 'Nom');

    const parser = createReadStream('./athlete_events.csv').pipe(parse({
        columns: true,
        skip_empty_lines: true
    }));

    let medalsData: Medaille[] = [];

    parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
            const jeuxKey = `${record.City.trim()}-${record.Year.trim()}`;
            const jeuxID = jeuxMap.get(jeuxKey);
            const eventKey = jeuxID ? `${record.Event.trim()}-${jeuxID}` : null;
            const eventID = eventKey ? eventMap.get(eventKey) : null;
            const athleteID = athleteMap.get(record.Name.trim());

            logKeyIssues(jeuxKey, jeuxID, eventKey, eventID, record.Name.trim(), athleteID);

            if (eventID && athleteID) {
                medalsData.push({
                    _id: new ObjectId(),
                    NomMedaille: record.Medal.trim() === 'NA' ? 'Valeur non renseignée dans le dataset' : record.Medal.trim(),
                    EventID: eventID,
                    AthleteID: athleteID
                });
            }
        }
    });

    parser.on('end', async () => {
        try {
            const result = await medailles.insertMany(medalsData, { ordered: false });
            console.log(`Successfully inserted ${result.insertedCount} medals.`);
            res.status(201).send(`${result.insertedCount} medals successfully inserted.`);
        } catch (error) {
            console.error('Failed to insert medals:', error);
            res.status(500).send('Failed to insert medals due to a server error.');
        } finally {
            await client.close();
        }
    });

    parser.on('error', error => {
        console.error('Failed to parse CSV data:', error);
        res.status(500).send("Failed to parse CSV data.");
    });
});

async function buildMap(collection: Collection<Document>, fields: string) {
    const map = new Map();
    const items = await collection.find({}).toArray();
    items.forEach(item => {
        const key = fields.split('-').map(field => item[field]).join('-');
        map.set(key, item._id);
    });
    return map;
}

function logKeyIssues(jeuxKey: string, jeuxID: any, eventKey: string | null, eventID: any, athleteName: any, athleteID: any) {
    if (!jeuxID) console.log(`JeuxID not found for Key: ${jeuxKey}`);
    if (!eventID) console.log(`EventID not found for Key: ${eventKey}`);
    if (!athleteID) console.log(`AthleteID not found for Athlete: ${athleteName}`);
}

export default creermedailles;
