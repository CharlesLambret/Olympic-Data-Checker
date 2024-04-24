import { Router } from 'express';
import getAthlete from './requetes/read';
import { createathlete } from './requetes/create';
import { deleteathlete } from './requetes/delete';
import { updateathlete } from './requetes/update';

const indexathletes = Router();

indexathletes.use(
    getAthlete,
    createathlete,
    deleteathlete,
    updateathlete
);

export default indexathletes;