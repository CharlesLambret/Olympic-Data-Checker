import express from 'express';
import session from 'express-session';

import indexuser from './CRUD/users/classicuser';
import indexadmin from './CRUD/users/admin/indexusers';
import indexolympics from './CRUD/olympics/indexolympics';

import { createServer } from 'http';
import { Server, WebSocket } from 'ws';

// ---------------- Init serveur ---------------- //
const app = express();
app.use(express.json());

// ---------------- Session ---------------- //
app.use(session({
  secret: '8xxR1ZXfXUMKYqcsdhCU',
  resave: false,
  saveUninitialized: false,
  name: 'connect.sid',
  cookie: { secure: 'auto', httpOnly: true }
}));

// ---------------- Web socket ---------------- //

let connections: any[] = [];

const server = createServer(app);

const wss = new Server({ server });

wss.on('connection', (ws: WebSocket) => {
  
  connections.push(ws);

  ws.on('message', (message: string) => {
    ws.send('Message reçu');
  });

  ws.on('close', () => {
    connections = connections.filter(conn => conn !== ws);
  });

  ws.send('Bienvenue sur le serveur WebSocket');
});

// ---------------- Routes ---------------- //
app.use(
  indexuser, 
  indexadmin, 
  indexolympics
);

// ---------------- Confirmation ---------------- //

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
