import { Router } from 'express';
import indexathletes from './athletes/indexathletes';
import indexevenements from './evenements/indexevenements';
import indexmedailles from './medailles/indexmedailles';
import indexpays from './pays/indexpays'
import indexjeux from './jeux/indexjeux';
import indexsports from './sports/indexsports';
export const indexolympics = Router();

indexolympics.use(
    indexathletes,
    indexevenements,
    indexmedailles,
    indexpays,
    indexjeux,
    indexsports
);

export default indexolympics;