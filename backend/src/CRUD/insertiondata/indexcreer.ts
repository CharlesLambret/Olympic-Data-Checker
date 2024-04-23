import { Router } from 'express';
import creerjeux from './insertGames';
import creerathlete from './insertAthletes';
import creerevenements from './insertionévénements';
import creermedailles from './insertmedals';

const indexinsertion = Router();

indexinsertion.use(
    creerathlete   ,
    creerjeux,
    creerevenements,
    creermedailles
);


export default indexinsertion;