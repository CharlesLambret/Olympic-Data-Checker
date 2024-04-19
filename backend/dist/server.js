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
const call_1 = require("./db/call");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello, this is Express + TypeScript");
});
app.get("/test", (req, res) => {
    res.send("Test");
});
app.get("/test-mongo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, call_1.MongoConnection)();
        res.send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send("An unknown error occurred");
        }
    }
}));
app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
