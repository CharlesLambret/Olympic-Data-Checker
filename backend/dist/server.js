"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createadmin_1 = require("./CRUD/users/admin/createadmin");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello, this is Express + TypeScript");
});
app.post("/create-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password, admin } = req.body;
    try {
        if (!email || !name || !password || admin === undefined) {
            res.status(400).send("Missing required fields");
            return;
        }
        const result = yield (0, createadmin_1.createAdmin)(email, name, password, admin);
        res.send(result);
    }
    catch (error) {
        res.status(500).send("Failed to create admin: " + error.message);
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.get("/test-create-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = "test@example.com";
        const name = "Test Admin";
        const password = "testpassword";
        const admin = true;
        const result = yield (0, createadmin_1.createAdmin)(email, name, password, admin);
        res.send(result);
    }
    catch (error) {
        res.status(500).send("Failed to create admin: " + error.message);
    }
}));
