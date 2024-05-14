import express from "express";
import { ObjectId } from "mongodb";
import getAllOlympics  from "../call/getAllOlympics";

export const getallOlympics = express.Router();

getallOlympics.get('/getAllOlympics', (req, res) => {
    getAllOlympics();
  });