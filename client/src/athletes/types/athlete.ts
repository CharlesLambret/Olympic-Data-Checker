export type Athlete = {
  _id: string;
  Nom: string;
  Discipline: string;
  Age: number;
  Poids: number | null;
  Taille: number | null;
  Sexe: string;
  PaysID: {
    $oid: string;
    noc: string;
    region: string;
    notes: string;
  };
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
