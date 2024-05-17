export type Athlete = {
  _id: string;
  Nom: string;
  Sport: string;
  Age: number;
  Poids: number | null;
  Taille: number | null;
  Sexe: string;
  Pays: string;
};

export type AthleteDetails = {
  _id: string;
  Nom: string;
  Discipline: string;
  Age: number;
  Poids: number | null;
  Taille: number | null;
  Sexe: string;
  totalMedailles: number;
  medailles: AthleteMedal[];
  Pays: string;
  Sport: string;
};

export type AthleteMedal = {
  NomMedaille: string;
  Event: string;
  Year: number;
  City: string;
  Season: string;
};
