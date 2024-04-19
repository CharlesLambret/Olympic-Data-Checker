import { Router } from 'express';
import userCreate from './requests/create';
import {userRead, userReadById} from './requests/read';
import userUpdate from './requests/update';

const indexuser = Router();

indexuser.use(userCreate);
indexuser.use(userRead);
indexuser.use(userReadById);
indexuser.use(userUpdate);

export default indexuser;