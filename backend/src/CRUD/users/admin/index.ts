import { Router } from 'express';
import adminCreate from './requests/create';
import {adminRead, adminReadById} from './requests/read';

const indexadmin = Router();

indexadmin.use(adminCreate);
indexadmin.use(adminRead);
indexadmin.use(adminReadById);

export default indexadmin;