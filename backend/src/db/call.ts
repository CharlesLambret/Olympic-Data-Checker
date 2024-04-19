import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export async function MongoConnection() {
    const uri = process.env.MONGO_URI!;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        auth: {
            username: process.env.MONGO_USERNAME,
            password: process.env.MONGO_PASSWORD,
        },
    });

    try {
        await client.connect();
        console.log("Connecté à MongoDB!");
        return client;  
    } catch (error) {
        console.error("Erreur lors de la connexion à MongoDB :", error);
        throw error; 
    }
}
