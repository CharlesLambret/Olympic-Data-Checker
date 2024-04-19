import { Request, Response, Router } from 'express';
import { createUser } from '../operations/createuser';

const userCreate = Router();

userCreate.post("/user/signup", async (req: Request, res: Response) => {
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

export default userCreate;