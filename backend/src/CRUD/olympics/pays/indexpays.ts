import { Router } from 'express';
import { creatCountry } from './requetes/create';
import { deletCountry } from './requetes/delete';
import { getCountry } from './requetes/read';
import { updatCountry } from './requetes/update';

export const indexpays = Router();

indexpays.use(
    creatCountry,
    deletCountry,
    getCountry,
    updatCountry
);

export default indexpays;