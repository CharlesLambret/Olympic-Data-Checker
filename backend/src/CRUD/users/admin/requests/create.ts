import { Request, Response, Router } from 'express';
import { createAdmin } from '../operations/createadmin';
import {isAuthenticated} from '../../../utils/isauthenticated';

const adminCreate = Router();

adminCreate.post("/admin/create",isAuthenticated, async (req: Request, res: Response) => {
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

export default adminCreate;