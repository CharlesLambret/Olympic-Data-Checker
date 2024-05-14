import { Router } from 'express';
import { getallOlympics } from './2024/requetes/getAll';
import getAllOlympics from './2024/call/getAllOlympics';

export const index2024 = Router();

index2024.use(
    getAllOlympics
)
    
