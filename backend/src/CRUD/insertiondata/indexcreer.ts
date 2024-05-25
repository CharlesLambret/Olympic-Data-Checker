import { Router } from 'express';
import creerathlete from './insertAthletes';
import creermedailles from './insertmedals';

const indexinsertion = Router();

indexinsertion.use(
    creerathlete   ,
    creermedailles
);


export default indexinsertion;