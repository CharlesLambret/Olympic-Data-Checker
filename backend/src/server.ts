import express, { Express, Request, Response } from "express";
import { createAdmin } from './CRUD/users/admin/createadmin';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
app.use(express.json()); 
const port = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, this is Express + TypeScript");
});

app.post("/create-admin", async (req: Request, res: Response) => {
  const { email, name, password, admin } = req.body;
  try {
    if (!email || !name || !password || admin === undefined) {
      res.status(400).send("Missing required fields");
      return;
    }
    const result = await createAdmin(email, name, password, admin);
    res.send(result);
  } catch (error: any) {
    res.status(500).send("Failed to create admin: " + error.message);
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get("/test-create-admin", async (req: Request, res: Response) => {
  try {
    const email = "test@example.com";
    const name = "Test Admin";
    const password = "testpassword";
    const admin = true;

    const result = await createAdmin(email, name, password, admin);
    res.send(result);
  } catch (error: any) {
    res.status(500).send("Failed to create admin: " + error.message);
  }
});
app.get("/get-admin", async (req: Request, res: Response) => {
  try {
    // Logic to get admin
    res.send("Get admin route");
  } catch (error: any) {
    res.status(500).send("Failed to get admin: " + error.message);
  }
});

app.put("/update-admin", async (req: Request, res: Response) => {
  try {
    // Logic to update admin
    res.send("Update admin route");
  } catch (error: any) {
    res.status(500).send("Failed to update admin: " + error.message);
  }
});

app.post("/create-user", async (req: Request, res: Response) => {
  try {
    // Logic to create user
    res.send("Create user route");
  } catch (error: any) {
    res.status(500).send("Failed to create user: " + error.message);
  }
});

app.delete("/delete-user", async (req: Request, res: Response) => {
  try {
    // Logic to delete user
    res.send("Delete user route");
  } catch (error: any) {
    res.status(500).send("Failed to delete user: " + error.message);
  }
});

app.get("/get-user", async (req: Request, res: Response) => {
  try {
    // Logic to get user
    res.send("Get user route");
  } catch (error: any) {
    res.status(500).send("Failed to get user: " + error.message);
  }
});

app.put("/update-user", async (req: Request, res: Response) => {
  try {
    // Logic to update user
    res.send("Update user route");
  } catch (error: any) {
    res.status(500).send("Failed to update user: " + error.message);
  }
});