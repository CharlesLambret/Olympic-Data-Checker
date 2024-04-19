import { Request, Response, Router } from 'express';
import { getUserById, getUsers } from '../operations/getuser';

export const userReadById = Router();

userReadById.get("/user/read/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await getUserById(id);
      res.send(user);
    } catch (error: any) {
      res.status(500).send("Échec de la lecture de l'utilisateur : " + error.message);
    }
});

export const userRead = Router();

userRead.get("/user/read", async (req: Request, res: Response) => {
    try {
      const users = await getUsers();
      res.send(users);
    } catch (error: any) {
      res.status(500).send("Failed to read users: " + error.message);
    }
  });
