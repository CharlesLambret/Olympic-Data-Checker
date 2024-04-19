import express, { Request, Response } from 'express';
import { updateAdmin } from './CRUD/users/admin/operations/updateadmin';
import { deleteUser } from './CRUD/users/classicuser/operations/deleteuser';
import { updateUser } from './CRUD/users/classicuser/operations/updateuser';
import indexuser from './CRUD/users/classicuser';
import indexadmin from './CRUD/users/admin';

const app = express();
app.use(express.json());

app.use(indexuser, indexadmin)

app.put("/admin/update/:id", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    await updateAdmin(email, name, password, true);
    res.send("Admin updated successfully");
  } catch (error: any) {
    res.status(500).send("Failed to update admin: " + error.message);
  }
});

app.post("/user/create", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
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
