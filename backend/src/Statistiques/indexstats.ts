import { Router } from "express";
import {totalmedailles} from "./requetes/totalmedaille";

export const indexstats = Router();

indexstats.use(
    totalmedailles
);

export default indexstats;
