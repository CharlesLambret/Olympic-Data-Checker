import { Request, Response, Router } from 'express';
import { deleteUser } from '../operations/deleteuser';

const userDelete = Router();

userDelete.delete("/user/delete/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await deleteUser(id);
      res.send("User deleted successfully");
    } catch (error: any) {
      res.status(500).send("Failed to delete user: " + error.message);
    }
  });

export default userDelete;