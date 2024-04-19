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
const updateadmin_1 = require("./CRUD/users/admin/operations/updateadmin");
const deleteuser_1 = require("./CRUD/users/classicuser/operations/deleteuser");
const updateuser_1 = require("./CRUD/users/classicuser/operations/updateuser");
const classicuser_1 = __importDefault(require("./CRUD/users/classicuser"));
const admin_1 = __importDefault(require("./CRUD/users/admin"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(classicuser_1.default, admin_1.default);
app.put("/admin/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        yield (0, updateadmin_1.updateAdmin)(email, name, password, true);
        res.send("Admin updated successfully");
    }
    catch (error) {
        res.status(500).send("Failed to update admin: " + error.message);
    }
}));
app.post("/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
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
