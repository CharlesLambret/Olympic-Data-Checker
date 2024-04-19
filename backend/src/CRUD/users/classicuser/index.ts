import { Router } from 'express';
import userCreate from './requests/create';
import {userRead, userReadById} from './requests/read';
import userUpdate from './requests/update';
import userDelete from './requests/delete';
import {userLogin, userLogout} from './requests/auth';

const indexuser = Router();

indexuser.use(
    userCreate, 
    userRead, 
    userReadById, 
    userUpdate, 
    userDelete, 
    userLogin, 
    userLogout
);


export default indexuser;