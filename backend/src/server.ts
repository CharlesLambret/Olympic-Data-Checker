import express from "express";
import session from "express-session";
import cors from "cors";

import indexuser from './CRUD/users/classicuser';
import indexadmin from './CRUD/users/admin/indexusers';
import indexolympics from './CRUD/olympics/indexolympics';
import { indexstats } from "./Statistiques/indexstats";

import { createServer } from 'http';
import { Server, WebSocket } from 'ws';


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "8xxR1ZXfXUMKYqcsdhCU",
    resave: false,
    saveUninitialized: false,
    name: "connect.sid",
    cookie: { secure: "auto", httpOnly: true },
  })
);

let connections: any[] = [];

const server = createServer(app);

const wss = new Server({ server });

wss.on("connection", (ws: WebSocket) => {
  connections.push(ws);

  ws.on("message", (message: string) => {
    ws.send("Message reçu");
  });

  ws.on("close", () => {
    connections = connections.filter((conn) => conn !== ws);
  });

  ws.send("Bienvenue sur le serveur WebSocket");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.use(
  indexuser, 
  indexadmin, 
  indexolympics,
  indexstats

);


