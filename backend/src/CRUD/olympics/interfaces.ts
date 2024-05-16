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

export interface Medal {
    _id: ObjectId;
    AthleteID: ObjectId;
    EventID: ObjectId;
    NomMedaille : 'Or' | 'Argent' | 'Bronze';
}

export interface Country {
    _id : ObjectId;
    noc : string;
    region : string;
    notes : string;
}

export interface Game {
    _id : ObjectId;
    Annee : number;
    Saison : 'Summer' | 'Winter';
    Ville : string;
}

export interface Sport {
    _id : ObjectId;
    NomSport : string;
}