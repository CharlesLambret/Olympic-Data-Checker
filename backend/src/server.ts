import express, { Request, Response } from 'express';
import { readAdmin} from './CRUD/users/admin/getadmin';
import { updateAdmin } from './CRUD/users/admin/updateadmin';
import { createUser } from './CRUD/users/classicuser/createuser';
import { deleteUser } from './CRUD/users/classicuser/deleteuser';
import { getUser } from './CRUD/users/classicuser/getuser';
import { createAdmin } from './CRUD/users/admin/createadmin';
const app = express();
app.use(express.json());

app.get("/read-admin/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const admins = await readAdmin(id);
    res.send(admins);
  } catch (error: any) {
    res.status(500).send("Failed to read admin: " + error.message);
  }
});

app.put("/update-admin/:id", async (req: Request, res: Response) => {
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

app.post("/create-user", async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const name = req.params.name;
    const password = req.params.password;
    await createUser(email, name, password, true);
    res.send("User created successfully");
  } catch (error: any) {
    res.status(500).send("Failed to create user: " + error.message);
  }
});

app.delete("/delete-user/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteUser(id);
    res.send("User deleted successfully");
  } catch (error: any) {
    res.status(500).send("Failed to delete user: " + error.message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.post("/create-admin", async (req: Request, res: Response) => {
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

app.get("/read-user/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
  } catch (error: any) {
    res.status(500).send("Failed to read user: " + error.message);
  }
});



app.post("/create-admin", async (req: Request, res: Response) => {
  try {
    const email = 'testadmin@gmail.com';
    const name = 'admin';
    const password = '1';
    await createAdmin(email, name, password, true);
    res.send("Admin created successfully");
  } catch (error: any) {
    res.status(500).send("Failed to create admin: " + error.message);
  }
});

app.post("/create-user", async (req: Request, res: Response) => {
  try {
    const email = 'testuser@gmail.com';
    const name = 'admin';
    const password = '2';
    await createUser(email, name, password, true);
    res.send("User created successfully");
  } catch (error: any) {
    res.status(500).send("Failed to create user: " + error.message);
  }
});

app.get("/create-admin-test", async (req: Request, res: Response) => {
  try {
    const email = 'testadmin@gmail.com';
    const name = 'admin';
    const password = '1';
    await createAdmin(email, name, password, true);
    res.send("Admin created successfully");
  } catch (error: any) {
    res.status(500).send("Failed to create admin: " + error.message);
  }
});

app.get("/create-user-test", async (req: Request, res: Response) => {
  try {
    const email = 'testuser@gmail.com';
    const name = 'admin';
    const password = '2';
    await createUser(email, name, password, true);
    res.send("User created successfully");
  } catch (error: any) {
    res.status(500).send("Failed to create user: " + error.message);
  }
});