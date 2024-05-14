import { Router } from 'express';
import getEvent  from './requetes/read';
import { creatEvent } from './requetes/create';
import { deletEvent } from './requetes/delete';
import { updatEvent } from './requetes/update';

const indexevenements = Router();

indexevenements.use(
   getEvent,
   creatEvent,
    deletEvent,
    updatEvent
);

export default indexevenements;