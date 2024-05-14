import { Router } from 'express';
import insertAthletes from './insertAthletes';
import insertmedals from './insertmedals';

const indexinsertion = Router();

indexinsertion.use(insertAthletes, insertmedals);

export default indexinsertion;
