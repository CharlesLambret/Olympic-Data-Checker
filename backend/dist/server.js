"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classicuser_1 = __importDefault(require("./CRUD/users/classicuser"));
const indexusers_1 = __importDefault(require("./CRUD/users/admin/indexusers"));
const indexolympics_1 = __importDefault(require("./CRUD/olympics/indexolympics"));
const index2024_1 = require("./API/index2024");
const http_1 = require("http");
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(classicuser_1.default, indexusers_1.default, indexolympics_1.default, index2024_1.index2024);
let connections = [];
const server = (0, http_1.createServer)(app);
// Configuration du serveur WebSocket
const wss = new ws_1.WebSocketServer({ server });
// Fonction pour gérer les connexions WebSocket
wss.on('connection', (ws) => {
    console.log('Un nouveau client est connecté');
    // Ajouter la connexion à la liste
    connections.push(ws);
    ws.on('message', (message) => {
        console.log(`Message reçu : ${message}`);
        // Répondez au client
        ws.send('Message reçu');
    });
    ws.on('close', () => {
        console.log('Le client est déconnecté');
        // Supprimer la connexion de la liste
        connections = connections.filter(conn => conn !== ws);
    });
    // Envoyer un message de bienvenue au client
    ws.send('Bienvenue sur le serveur WebSocket');
});
// Route pour obtenir l'état des WebSockets
app.get('/websocket-status', (req, res) => {
    res.json({
        activeConnections: connections.length
    });
});
// Lancement du serveur HTTP
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
