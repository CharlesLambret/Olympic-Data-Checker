import { Router } from 'express';
import { creatGame } from './requetes/create';
import { deletGame } from './requetes/delete';
import { getGame } from './requetes/read';
import { updatGame } from './requetes/update';

export const indexjeux = Router();

indexjeux.use(
    creatGame,
    deletGame,
    getGame,
    updatGame
);

export default indexjeux;