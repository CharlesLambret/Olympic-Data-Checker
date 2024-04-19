import express, { Express, Request, Response } from "express";
import { createAdmin } from "./CRUD/users/admin/createadmin";
import dotenv from "dotenv";
import { MongoConnection } from "./db/call";
dotenv.config();

const app: Express = express();
app.use(express.json());
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.post("/create-admin", async (req: Request, res: Response) => {
  const { email, name, password, admin } = req.body;
  try {
    if (!email || !name || !password || admin === undefined) {
      res.status(400).send("Missing required fields");
      return;
    }
    const result = await createAdmin(email, name, password, admin);
    res.send(result);
  } catch (error: any) {
    res.status(500).send("Failed to create admin: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/medals", async (req: Request, res: Response) => {
  const client = await MongoConnection();
  const db = client.db("TP-React");
  const collection = db.collection("medals");
  const documents = await collection.find({}).limit(25).toArray();
  res.send(documents);
});
