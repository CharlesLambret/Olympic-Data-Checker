import React, { useEffect, useState } from "react";

import man from "@/static/man.png";
import woman from "@/static/woman.png";
import { Badge } from "@/components/Badge";
import Medals2 from "../icons/Medals2";
import Medals1 from "../icons/Medals1";
import Medals3 from "../icons/Medals3";
import { Athlete } from "../types/athlete";
import { get } from "@/lib/api";
import { useParams } from "react-router-dom";

const SingleAthlete: React.FC = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState<Athlete | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await get<Athlete>("/getathlete/" + id);
        setAthlete(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="mx-5">
      {athlete === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-between">
          <div className="ml-10 mt-16">
            <div className="flex gap-2 mb-4">
              <Badge className="bg-black w-fit">{athlete.Discipline}</Badge>
              <Badge className="bg-black w-fit">{athlete.PaysID.region}</Badge>
              <Badge className="bg-black w-fit">
                Médaillé{athlete.Sexe === "M" ? "" : "e"} à {athlete.Age} ans
              </Badge>
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
      )}
    </div>
  );
};

export default SingleAthlete;
