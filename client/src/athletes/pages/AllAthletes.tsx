import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/Input";
import AthleteCard from "../components/AthleteCard";

const athletes = [
  {
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
  },
  {
    _id: { $oid: "6629506adb8a12c62faac332" },
    Nom: "Arvo Ossian Aaltonen",
    Discipline: "Swimming",
    Age: 30,
    Poids: null,
    Taille: null,
    Sexe: "F",
    PaysID: {
      $oid: "6627f371b59255f0bab8816c",
      noc: "ALG",
      region: "Algeria",
      notes: "test",
    },
  },
  {
    _id: { $oid: "6629506adb8a12c62faac332" },
    Nom: "Arvo Ossian Aaltonen",
    Discipline: "Swimming",
    Age: 30,
    Poids: null,
    Taille: null,
    Sexe: "F",
    PaysID: {
      $oid: "6627f371b59255f0bab8816c",
      noc: "ALG",
      region: "Algeria",
      notes: "test",
    },
  },
];

const AllAthletes: React.FC = () => {
  return (
    <div className="mx-5">
      <Input className="mb-4 w-80" type="text" placeholder="Rechercher..." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete) => (
          <Link
            to={`/athletes/${athlete._id.$oid}`}
            key={athlete._id.$oid}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-slate-300"
          >
            <AthleteCard athlete={athlete} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllAthletes;
