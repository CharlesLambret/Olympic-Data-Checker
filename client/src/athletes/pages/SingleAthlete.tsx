import React from "react";
import NavBar from "@/app/components/NavBar";
import man from "@/static/man.png";
import woman from "@/static/woman.png";

const athlete = {
  _id: { $oid: "6629506adb8a12c62faac332" },
  Nom: "Arvo Ossian Aaltonen",
  Discipline: "Swimming",
  Age: 30,
  Poids: null,
  Taille: null,
  Sexe: "M",
  PaysID: {
    $oid: "6627f371b59255f0bab8816c",
    noc: "ALG",
    region: "Algeria",
    notes: "test",
  },
};

const SingleAthlete: React.FC = () => {
  return (
    <div className="mx-5">
      <NavBar />
      <div className="flex justify-between">
        <div className="pl-10 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold">{athlete.Nom}</h1>
          <p className="text-3xl font-bold mt-5">
            Discipline : {athlete.Discipline}
          </p>
          <p className="text-3xl font-bold mt-5">Âge : {athlete.Age} ans</p>
          <p className="text-3xl font-bold mt-5">Poids : {athlete.Poids}</p>
          <p className="text-3xl font-bold mt-5">Taille : {athlete.Taille}</p>
          <p className="text-3xl font-bold mt-5">
            Région : {athlete.PaysID.region}
          </p>
        </div>
        <div className="relative h-[700px] w-[520px]">
          <img
            className="h-full w-full object-top object-cover"
            src={athlete.Sexe === "M" ? man : woman}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[30%] from-transparent to-white"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleAthlete;
