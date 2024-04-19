import { MongoClient, ServerApiVersion } from 'mongodb';

export async function checkMongoConnection() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return 'MongoDB connection successful.';
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return `Failed to connect to MongoDB: ${error}`;
  } finally {
    await client.close();
  }
}
