
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://charleslambretpro:u13PIbpkH0i5nAQ7@tp-react.dc6nil3.mongodb.net/?retryWrites=true&w=majority&appName=TP-React";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
