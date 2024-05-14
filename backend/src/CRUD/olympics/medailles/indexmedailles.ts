import { Router } from 'express';
import { creatMedal } from './requetes/create';
import { deletMedal } from './requetes/delete';
import { getMedal } from './requetes/read';
import { updatMedal } from './requetes/update';

export const indexmedailles = Router();

indexmedailles.use(
    creatMedal,
    deletMedal,
    getMedal,
    updatMedal
);

