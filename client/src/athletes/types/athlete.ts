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
