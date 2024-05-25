import { topcountries } from "./requetes/requetetop";
import { statsmedailles } from "./requetes/requetemedailles";
import { Router } from "express";

export const indexstats = Router();

indexstats.use(
    topcountries,
    statsmedailles
);