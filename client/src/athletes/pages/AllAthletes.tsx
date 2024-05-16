import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/Input";
import AthleteCard from "../components/AthleteCard";
import { get } from "@/lib/api";
import { Athlete } from "../types/athlete";
import useDebounce from "@/app/hooks/useDebounce";

const AllAthletes: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[] | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      try {
        const response = await get<Athlete[]>(
          "/getathletes?name=" + debouncedSearch
        );
        // Only the first 100
        response.length = 100;
        setAthletes(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [debouncedSearch]);

  return (
    <div className="mx-5">
      <Input
        className="mb-4 w-80"
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes === null ? (
          <p>Loading...</p>
        ) : (
          <>
            {athletes.map((athlete) => (
              <Link
                to={`/athletes/${athlete._id}`}
                key={athlete._id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-slate-300"
              >
                <AthleteCard athlete={athlete} />
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllAthletes;
