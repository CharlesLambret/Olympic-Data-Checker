import { Request, Response, Router } from 'express';
import { readAdminById, readAdmins } from '../operations/getadmin';
import {isAuthenticated} from '../../../utils/isauthenticated';

export const adminRead = Router();

adminRead.get("/admin/read",isAuthenticated, async (req: Request, res: Response) => {
    try {
      const admins = await readAdmins();
      res.send(admins);
    } catch (error: any) {
      res.status(500).send("Failed to read admins: " + error.message);
    }
});

export const adminReadById = Router();

adminReadById.get("/admin/read/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const admins = await readAdminById(id);
      res.send(admins);
    } catch (error: any) {
      res.status(500).send("Failed to read admin: " + error.message);
    }
  });

