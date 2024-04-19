import express, { Request, Response } from 'express';
import { deleteUser } from './CRUD/users/classicuser/operations/deleteuser';
import indexuser from './CRUD/users/classicuser';
import indexadmin from './CRUD/users/admin';

const app = express();
app.use(express.json());

app.use(indexuser, indexadmin)



app.delete("/user/delete/:id", async (req: Request, res: Response) => {
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
