import { Router } from 'express';
import indexathletes from './athletes/indexathletes';
import indexevenements from './evenements/indexevenements';

const indexolympics = Router();

indexolympics.use(
    indexathletes,
    indexevenements
);

export default indexolympics;