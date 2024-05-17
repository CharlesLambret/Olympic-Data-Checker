export type Country = {
  _id: string;
  noc: string;
  region: string;
};

export type CountryDetails = {
  _id: string;
  noc: string;
  region: string;
  medailles: Medals;
};

export type Medals = {
  gold: number;
  silver: number;
  bronze: number;
};
