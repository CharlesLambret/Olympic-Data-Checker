import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export async function checkMongoConnection() {
  const uri = process.env.MONGO_URI;
  const apiKey = process.env.MONGO_PRIVATE_KEY_DEV;
  const client = new MongoClient(uri!, {
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
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    return "MongoDB connection successful.";
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return `Failed to connect to MongoDB: ${error}`;
  } finally {
    await client.close();
  }
}
