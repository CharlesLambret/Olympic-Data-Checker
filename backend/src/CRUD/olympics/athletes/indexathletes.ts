import { Router } from 'express';
import getAthlete from './requetes/read';

const indexathletes = Router();

indexathletes.use(getAthlete);

export default indexathletes;