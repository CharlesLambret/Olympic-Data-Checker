import express from 'express';
import indexuser from './CRUD/users/classicuser';
import indexadmin from './CRUD/users/admin/indexusers';
import indexolympics from './CRUD/olympics/indexolympics';
import { index2024 } from './API/index2024';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
app.use(express.json());

app.use(
  indexuser, 
  indexadmin, 
  indexolympics,
  index2024
);

const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    ws.send('Message reçu');
  });

  ws.on('close', () => {
  });

  ws.send('Bienvenue sur le serveur WebSocket');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
