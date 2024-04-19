import express, { Express, Request, Response } from "express";
import { checkMongoConnection } from './db/call'; 

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.get("/test-mongo", async (req: Request, res: Response) => {
  const result = await checkMongoConnection();
  res.send(result);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
