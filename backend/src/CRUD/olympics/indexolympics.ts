import { Router } from 'express';
import indexathletes from './athletes/indexathletes';
import indexevenements from './evenements/indexevenements';
import indexmedailles from './medailles/indexmedailles';


export const indexolympics = Router();

indexolympics.use(
    indexathletes,
    indexevenements,
    indexmedailles
);

export default indexolympics;