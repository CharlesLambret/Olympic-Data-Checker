import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

export async function MongoConnection() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MongoDB URI is not defined in environment variables");
    }
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
        console.log("Connected to MongoDB!");
        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}
