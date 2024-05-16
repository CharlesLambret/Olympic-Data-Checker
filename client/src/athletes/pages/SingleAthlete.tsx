import React from "react";
import NavBar from "@/app/components/NavBar";
import man from "@/static/man.png";
import woman from "@/static/woman.png";
import { Badge } from "@/components/Badge";
import Medals2 from "../icons/Medals2";
import Medals1 from "../icons/Medals1";
import Medals3 from "../icons/Medals3";

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
      <div className="flex justify-between">
        <div className="ml-10 mt-16">
          <div className="flex gap-2 mb-4">
            <Badge className="bg-black w-fit">{athlete.Discipline}</Badge>
            <Badge className="bg-black w-fit">{athlete.PaysID.region}</Badge>
            <Badge className="bg-black w-fit">{athlete.Age} years</Badge>
            {athlete.Poids && (
              <Badge className="bg-black w-fit">{athlete.Poids} kg</Badge>
            )}
            {athlete.Taille && (
              <Badge className="bg-black w-fit">{athlete.Taille} cm</Badge>
            )}
          </div>
          <h1 className="text-5xl font-extrabold mb-4">{athlete.Nom}</h1>
          <div className="flex flex-col gap-4">
            <div className="flex item-center gap-2">
              <Medals1 className="w-10" />
              <p className="font-bold flex items-center">9 medals</p>
            </div>
            <div className="flex item-center gap-2">
              <Medals2 className="w-10" />
              <p className="font-bold flex items-center">9 medals</p>
            </div>
            <div className="flex item-center gap-2">
              <Medals3 className="w-10" />
              <p className="font-bold flex items-center">9 medals</p>
            </div>
          </div>
        </div>
        <div className="mr-16 relative h-[700px] w-[520px]">
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
