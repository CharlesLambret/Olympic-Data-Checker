"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const classicuser_1 = __importDefault(require("./CRUD/users/classicuser"));
const indexusers_1 = __importDefault(require("./CRUD/users/admin/indexusers"));
const indexolympics_1 = __importDefault(require("./CRUD/olympics/indexolympics"));
<<<<<<< HEAD
=======
const index2024_1 = require("./API/index2024");
>>>>>>> 9a4c19668d9cad4aee032723799e35b31038d582
const http_1 = require("http");
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.use(express_1.default.json());
<<<<<<< HEAD
app.use((0, express_session_1.default)({
    secret: '8xxR1ZXfXUMKYqcsdhCU',
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: { secure: 'auto', httpOnly: true }
}));
let connections = [];
const server = (0, http_1.createServer)(app);
const wss = new ws_1.Server({ server });
wss.on('connection', (ws) => {
    connections.push(ws);
    ws.on('message', (message) => {
        ws.send('Message reçu');
    });
    ws.on('close', () => {
        connections = connections.filter(conn => conn !== ws);
    });
    ws.send('Bienvenue sur le serveur WebSocket');
});
app.use(classicuser_1.default, indexusers_1.default, indexolympics_1.default);
=======
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
>>>>>>> 9a4c19668d9cad4aee032723799e35b31038d582
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
