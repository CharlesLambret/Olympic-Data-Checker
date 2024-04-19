import { Router } from 'express';
import userCreate from './requests/create';
import {userRead, userReadById} from './requests/read';

const indexuser = Router();

indexuser.use(userCreate);
indexuser.use(userRead);
indexuser.use(userReadById);

export default indexuser;