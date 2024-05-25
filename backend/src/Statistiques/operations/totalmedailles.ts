import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';

export async function getTotalMedailles(id: string, type: string) {
    if (type === 'athlete') {
        return await getTotalMedaillesAthlete(id);
    }
    if (type === 'pays') {
        return await getTotalMedaillesPays(id);
    }
    return { error: 'Invalid type parameter. Only "athlete" and "pays" are allowed.' };
}

export async function getTotalMedaillesAthlete(id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medailles = db.collection("medailles");

    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const medals = await medailles.find({ AthleteID: new ObjectId(id) }).toArray();
        const totalMedals = medals.length;

        return { totalMedals };
    } catch (error) {
        console.error('Error occurred:', error);
        return { error: 'Une erreur est survenue' };
    } finally {
        client.close();
    }
}

export async function getTotalMedaillesPays(id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medailles = db.collection("medailles");
    const athletes = db.collection('athletes');

    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const athletesOfCountry = await athletes.find({ PaysID: new ObjectId(id) }).toArray();
        const athleteIds = athletesOfCountry.map(athlete => athlete._id);
        const medals = await medailles.find({ AthleteID: { $in: athleteIds.map(id => new ObjectId(id)) } }).toArray();
        const totalMedals = medals.length;

        return { totalMedals };
    } catch (error) {
        console.error('Error occurred:', error);
        return { error: 'Une erreur est survenue' };
    } finally {
        client.close();
    }
}
