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
const http_1 = require("http");
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.use(classicuser_1.default, indexusers_1.default, indexolympics_1.default);
