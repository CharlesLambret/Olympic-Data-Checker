import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});

app.post("/signUp", (req: Request, res: Response) => {
  console.log("[Server]: i have recieve a request");
  res.send("post ");
});
