import { Router } from 'express';
import { creatSport } from './requetes/create';
import { deletSport } from './requetes/delete';
import { getSport } from './requetes/read';
import { updatSport } from './requetes/update';

export const indexsports = Router();

indexsports.use(
    creatSport,
    deletSport,
    getSport,
    updatSport
);

export default indexsports;