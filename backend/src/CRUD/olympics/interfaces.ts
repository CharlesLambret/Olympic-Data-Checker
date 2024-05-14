import { ObjectId } from "mongodb";

export interface Athlete {
    _id: ObjectId;
    Nom: string;
    Discipline: string;
    Age: number;
    Poids: number;
    Taille: number;
    Sexe: 'M' | 'F';
    PaysID: ObjectId;
}

export interface Event {
    _id : ObjectId;
    Discipline: string;
    NomEvent: string;
    JeuxID: ObjectId;
}