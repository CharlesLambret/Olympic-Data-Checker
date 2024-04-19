import express, { Express, Request, Response } from "express";
import { checkMongoConnection } from './db/call'; 
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Test");
});
app.get("/test-mongo", async (req: Request, res: Response) => {
  try {
    const result = await checkMongoConnection();
    res.send(result);
  } catch (error: unknown) { 
    if (error instanceof Error) {
      res.status(500).send(error.message); 
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});

app.post("/signUp", (req: Request, res: Response) => {
  console.log("signUp");
  // userform = response.data
  // userdata = validator(userform)
  // user = new User(userdata)
});

app.post("/logIn", (req: Request, res: Response) => {
  // loginform = response.data
  // user = User.login(loginform)
  // add a way too indicate that the user is logged in
});
