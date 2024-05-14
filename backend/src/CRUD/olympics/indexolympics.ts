import { Router } from 'express';
import indexathletes from './athletes/indexathletes';
import indexevenements from './evenements/indexevenements';
import indexmedailles from './medailles/indexmedailles';
import indexpays from './pays/indexpays'

export const indexolympics = Router();

indexolympics.use(
    indexathletes,
    indexevenements,
    indexmedailles,
    indexpays
);

export default indexolympics;