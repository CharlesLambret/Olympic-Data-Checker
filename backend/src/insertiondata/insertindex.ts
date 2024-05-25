import { Router } from 'express';
import  creersports  from './insertSports';
import creerathletes from './insertAthletes';
import creerjeux from './insertJeux';
import creerevenements from './insertEvent';
import creermedailles from './insertMedals';

export const insertindex = Router();

insertindex.use(
    creersports,
    creerathletes, 
    creerjeux, 
    creerevenements,
    creermedailles
);

export default insertindex;