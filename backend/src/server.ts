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
  console.log(Request);
  res.send(Response);
  // userform = response.data
  // userdata = validator(userform)
  // user = new User(userdata)
});

app.post("/logIn", (res: Request, res: Response) => {
  // loginform = response.data
  // user = User.login(loginform)
  // add a way too indicate that the user is logged in
});
