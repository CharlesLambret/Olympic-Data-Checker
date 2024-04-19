import express, { Request, Response } from 'express';
import { readAdmin } from './CRUD/users/admin/getadmin';
import { updateAdmin } from './CRUD/users/admin/updateadmin';
import { createUser } from './CRUD/users/classicuser/createuser';
import { deleteUser } from './CRUD/users/classicuser/deleteuser';
import { getUserById, getUsers } from './CRUD/users/classicuser/getuser';
import { createAdmin } from './CRUD/users/admin/createadmin';
import { updateUser } from './CRUD/users/classicuser/updateuser';


const app = express();
app.use(express.json());

// Admin routes
app.get("/admin/read/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const admins = await readAdmin(id);
    res.send(admins);
  } catch (error: any) {
    res.status(500).send("Failed to read admin: " + error.message);
  }
});

app.put("/admin/update/:id", async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const name = req.params.name;
    const password = req.params.password;
    await updateAdmin(email, name, password, true);
    res.send("Admin updated successfully");
  } catch (error: any) {
    res.status(500).send("Failed to update admin: " + error.message);
  }
});

app.post("/admin/create", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    await createAdmin(email, name, password, true);
    res.send("Admin created successfully");
  } catch (error: any) {
    res.status(500).send("Failed to create admin: " + error.message);
  }
});

// User routes
app.get("/user/read/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.send(user);
  } catch (error: any) {
    res.status(500).send("Failed to read user: " + error.message);
  }
});

app.get("/user/read", async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error: any) {
    res.status(500).send("Failed to read users: " + error.message);
  }
});

app.post("/user/create", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    await createUser(email, name, password, true);
    res.send("User created successfully");
  } catch (error: any) {
    res.status(500).send("Failed to create user: " + error.message);
  }
});

app.delete("/user/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteUser(id);
    res.send("User deleted successfully");
  } catch (error: any) {
    res.status(500).send("Failed to delete user: " + error.message);
  }
});
app.put("/user/update/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    await updateUser(id, email, name, password);
    res.send("User updated successfully");
  } catch (error: any) {
    res.status(500).send("Failed to update user: " + error.message);
  }
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
