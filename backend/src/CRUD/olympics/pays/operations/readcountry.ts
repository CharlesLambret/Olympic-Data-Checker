import { MongoConnection } from '../../../../db/call';
import { ObjectId } from 'mongodb';

export async function getCountryById(id: string | number) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const countries = db.collection("countries");

    try {
        const country = await countries.findOne({ _id: new ObjectId(id) });
        if (!country) {
            return "country not found.";
        }
        return country;
    } catch (error) {
        console.error("Failed to fetch country by ID:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function searchCountriesByName(countriesName: string ) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const countries = db.collection("countries");
    try {
        console.log(`Searching for countries with name: ${countriesName}`);  
        const countriesList = await countries.find({ region: { $regex: new RegExp(countriesName, 'i') }}).toArray();
        if (countriesList.length === 0) {
            console.log("No countries found with that name."); 
            return "No countries found.";
        }
        return countriesList;
    } catch (error) {
        console.error("Failed to search countries:", error);
        throw error;
    } finally {
        await client.close();
    }
}