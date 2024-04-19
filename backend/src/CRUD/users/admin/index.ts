import { Router } from 'express';
import adminCreate from './requests/create';
import {adminRead, adminReadById} from './requests/read';
import adminUpdate from './requests/update';

const indexadmin = Router();

indexadmin.use(adminCreate);
indexadmin.use(adminRead);
indexadmin.use(adminReadById);
indexadmin.use(adminUpdate);
export default indexadmin;