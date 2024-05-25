import { Badge } from "@/components/Badge";
import { Athlete } from "../types/athlete";
import man from "@/static/man.png";
import woman from "@/static/woman.png";

const AthleteCard = ({ athlete }: { athlete: Athlete }) => {
  return (
    <>
      <img
        src={athlete.Sexe === "M" ? man : woman}
        alt={athlete.Nom}
        className="mx-auto w-3/4 h-48 object-cover"
        style={{ objectPosition: "50% 1%" }}
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {athlete.Nom}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{athlete.Discipline}</p>
        <div className="flex gap-2 mt-4">
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
      </div>
    </>
  );
};

export default AthleteCard;
