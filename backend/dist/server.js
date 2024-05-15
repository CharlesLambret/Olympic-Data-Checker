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
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(session({
//   secret: '8xxR1ZXfXUMKYqcsdhCU',
//   resave: false,
//   saveUninitialized: false,
//   name: 'connect.sid',
//   cookie: { secure: 'auto', httpOnly: true }
// }));
app.use(classicuser_1.default, indexusers_1.default, indexolympics_1.default, index2024_1.index2024);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
