"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classicuser_1 = __importDefault(require("./CRUD/users/classicuser"));
const indexusers_1 = __importDefault(require("./CRUD/users/admin/indexusers"));
const express_session_1 = __importDefault(require("express-session"));
const indexolympics_1 = __importDefault(require("./CRUD/olympics/indexolympics"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: '8xxR1ZXfXUMKYqcsdhCU',
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: { secure: 'auto', httpOnly: true }
}));
app.use(classicuser_1.default, indexusers_1.default, indexolympics_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
