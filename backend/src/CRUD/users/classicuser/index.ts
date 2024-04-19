import { Router } from 'express';
import userCreate from './requests/create';
import {userRead, userReadById} from './requests/read';
import userUpdate from './requests/update';
import userDelete from './requests/delete';
import userLogin from './requests/login';

const indexuser = Router();

indexuser.use(userCreate);
indexuser.use(userRead);
indexuser.use(userReadById);
indexuser.use(userUpdate);
indexuser.use(userDelete);
indexuser.use(userLogin);

export default indexuser;