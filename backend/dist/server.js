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
const getadmin_1 = require("./CRUD/users/admin/getadmin");
const updateadmin_1 = require("./CRUD/users/admin/updateadmin");
const createuser_1 = require("./CRUD/users/classicuser/createuser");
const deleteuser_1 = require("./CRUD/users/classicuser/deleteuser");
const getuser_1 = require("./CRUD/users/classicuser/getuser");
const createadmin_1 = require("./CRUD/users/admin/createadmin");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/read-admin/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const admins = yield (0, getadmin_1.readAdmin)(id);
        res.send(admins);
    }
    catch (error) {
        res.status(500).send("Failed to read admin: " + error.message);
    }
}));
app.put("/update-admin/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const name = req.params.name;
        const password = req.params.password;
        yield (0, updateadmin_1.updateAdmin)(email, name, password, true);
        res.send("Admin updated successfully");
    }
    catch (error) {
        res.status(500).send("Failed to update admin: " + error.message);
    }
}));
app.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const name = req.params.name;
        const password = req.params.password;
        yield (0, createuser_1.createUser)(email, name, password, true);
        res.send("User created successfully");
    }
    catch (error) {
        res.status(500).send("Failed to create user: " + error.message);
    }
}));
app.delete("/delete-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, deleteuser_1.deleteUser)(id);
        res.send("User deleted successfully");
    }
    catch (error) {
        res.status(500).send("Failed to delete user: " + error.message);
    }
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.post("/create-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        yield (0, createadmin_1.createAdmin)(email, name, password, true);
        res.send("Admin created successfully");
    }
    catch (error) {
        res.status(500).send("Failed to create admin: " + error.message);
    }
}));
app.get("/read-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, getuser_1.getUser)(id);
        res.send(user);
    }
    catch (error) {
        res.status(500).send("Failed to read user: " + error.message);
    }
}));
app.post("/create-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = 'testadmin@gmail.com';
        const name = 'admin';
        const password = '1';
        yield (0, createadmin_1.createAdmin)(email, name, password, true);
        res.send("Admin created successfully");
    }
    catch (error) {
        res.status(500).send("Failed to create admin: " + error.message);
    }
}));
app.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = 'testuser@gmail.com';
        const name = 'admin';
        const password = '2';
        yield (0, createuser_1.createUser)(email, name, password, true);
        res.send("User created successfully");
    }
    catch (error) {
        res.status(500).send("Failed to create user: " + error.message);
    }
}));
app.get("/create-admin-test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = 'testadmin@gmail.com';
        const name = 'admin';
        const password = '1';
        yield (0, createadmin_1.createAdmin)(email, name, password, true);
        res.send("Admin created successfully");
    }
    catch (error) {
        res.status(500).send("Failed to create admin: " + error.message);
    }
}));
app.get("/create-user-test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = 'testuser@gmail.com';
        const name = 'admin';
        const password = '2';
        yield (0, createuser_1.createUser)(email, name, password, true);
        res.send("User created successfully");
    }
    catch (error) {
        res.status(500).send("Failed to create user: " + error.message);
    }
}));
