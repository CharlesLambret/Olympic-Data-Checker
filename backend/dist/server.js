"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classicuser_1 = __importDefault(require("./CRUD/users/classicuser"));
const admin_1 = __importDefault(require("./CRUD/users/admin"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(classicuser_1.default, admin_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});