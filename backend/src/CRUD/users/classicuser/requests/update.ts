import { Request, Response, Router } from 'express';
import { updateUser } from '../operations/updateuser';

const userUpdate = Router();

userUpdate.put("/user/update/:id", async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const name = req.body.name;
      const password = req.body.password;
      await updateUser(email, name, password, false);
      res.send("User updated successfully");
    } catch (error: any) {
      res.status(500).send("Failed to update user: " + error.message);
    }
  });

export default userUpdate;