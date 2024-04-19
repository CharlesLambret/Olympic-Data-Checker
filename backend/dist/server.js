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
const updateuser_1 = require("./CRUD/users/classicuser/updateuser");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Admin routes
app.get("/admin/read", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, getadmin_1.readAdmins)();
        res.send(admins);
    }
    catch (error) {
        res.status(500).send("Failed to read admins: " + error.message);
    }
}));
app.get("/admin/read/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const admins = yield (0, getadmin_1.readAdminById)(id);
        res.send(admins);
    }
    catch (error) {
        res.status(500).send("Failed to read admin: " + error.message);
    }
}));
app.put("/admin/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.post("/admin/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// User routes
app.get("/user/read/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, getuser_1.getUserById)(id);
        res.send(user);
    }
    catch (error) {
        res.status(500).send("Failed to read user: " + error.message);
    }
}));
app.get("/user/read", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getuser_1.getUsers)();
        res.send(users);
    }
    catch (error) {
        res.status(500).send("Failed to read users: " + error.message);
    }
}));
app.post("/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        yield (0, createuser_1.createUser)(email, name, password, true);
        res.send("User created successfully");
    }
    catch (error) {
        res.status(500).send("Failed to create user: " + error.message);
    }
}));
app.delete("/user/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, deleteuser_1.deleteUser)(id);
        res.send("User deleted successfully");
    }
    catch (error) {
        res.status(500).send("Failed to delete user: " + error.message);
    }
}));
app.put("/user/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        yield (0, updateuser_1.updateUser)(id, email, name, password);
        res.send("User updated successfully");
    }
    catch (error) {
        res.status(500).send("Failed to update user: " + error.message);
    }
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
