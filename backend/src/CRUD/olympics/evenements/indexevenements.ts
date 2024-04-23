import { Router } from 'express';
import getEvent from './requetes/read';

const indexevenements = Router();

indexevenements.use(getEvent);

export default indexevenements;