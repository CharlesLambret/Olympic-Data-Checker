import React, { useEffect, useState } from "react";

import man from "@/static/man.png";
import woman from "@/static/woman.png";
import { Badge } from "@/components/Badge";
import Medals2 from "../icons/Medals2";
import Medals1 from "../icons/Medals1";
import Medals3 from "../icons/Medals3";
import { AthleteDetails } from "../types/athlete";
import { get } from "@/lib/api";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";

const SingleAthlete: React.FC = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState<AthleteDetails | null>(null);

  const goldMedals = athlete?.medailles.filter(
    (medal) => medal.NomMedaille === "Gold"
  ).length;
  const silverMedals = athlete?.medailles.filter(
    (medal) => medal.NomMedaille === "Silver"
  ).length;
  const bronzeMedals = athlete?.medailles.filter(
    (medal) => medal.NomMedaille === "Bronze"
  ).length;

  useEffect(() => {
    (async () => {
      try {
        const response = await get<AthleteDetails>("/getathlete/" + id);
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
              <Badge className="bg-black w-fit">{athlete.Sport}</Badge>
              <Badge className="bg-black w-fit">{athlete.Pays}</Badge>
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
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex item-center gap-2">
                <Medals1 className="w-10" />
                <p className="font-bold flex items-center">
                  {goldMedals} medals
                </p>
              </div>
              <div className="flex item-center gap-2">
                <Medals2 className="w-10" />
                <p className="font-bold flex items-center">
                  {silverMedals} medals
                </p>
              </div>
              <div className="flex item-center gap-2">
                <Medals3 className="w-10" />
                <p className="font-bold flex items-center">
                  {bronzeMedals} medals
                </p>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold mb-4">
              Tableau des médailles
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Medal</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Season</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {athlete.medailles.map((medaille, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium flex items-center gap-1">
                      {medaille.NomMedaille === "Gold" ? (
                        <Medals1 className="w-6" />
                      ) : medaille.NomMedaille === "Silver" ? (
                        <Medals2 className="w-6" />
                      ) : (
                        <Medals3 className="w-6" />
                      )}
                      {medaille.NomMedaille}
                    </TableCell>
                    <TableCell>{medaille.Event}</TableCell>
                    <TableCell>{medaille.Year}</TableCell>
                    <TableCell>{medaille.City}</TableCell>
                    <TableCell>{medaille.Season}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
