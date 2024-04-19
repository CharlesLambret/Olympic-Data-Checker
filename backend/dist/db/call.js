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
exports.MongoConnection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function MongoConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.MONGO_URI;
        const apiKey = process.env.MONGO_PRIVATE_KEY_DEV;
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            auth: {
                username: process.env.MONGO_USERNAME,
                password: process.env.MONGO_PASSWORD,
            },
        });
        try {
            yield client.connect();
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            return 'MongoDB connection successful.';
        }
        catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            return `Failed to connect to MongoDB: ${error}`;
        }
        finally {
            yield client.close();
        }
    });
}
exports.MongoConnection = MongoConnection;
