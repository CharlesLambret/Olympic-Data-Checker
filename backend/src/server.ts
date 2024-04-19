import express, { Request, Response } from 'express';
import indexuser from './CRUD/users/classicuser';
import indexadmin from './CRUD/users/admin';

const app = express();
app.use(express.json());

app.use(indexuser, indexadmin)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
