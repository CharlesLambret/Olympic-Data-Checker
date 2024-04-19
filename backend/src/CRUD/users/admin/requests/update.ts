import { Request, Response, Router } from 'express';
import { updateAdmin } from '../operations/updateadmin';

const adminUpdate = Router();

adminUpdate.put("/admin/update/:id", async (req: Request, res: Response) => {
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

export default adminUpdate;